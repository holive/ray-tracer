import fs = require('fs')
import { Point } from '../tuples'
import { Group } from '../groups'
import { Triangle } from '../triangles/Triangle'
import { BaseShape } from '../shapes'

export class ParseObjFile {
  ignoredLines = 0
  vertices: Point[] = [null as unknown as Point]
  defaultGroup = new Group({} as BaseShape) // fillers first element
  groups: { [name: string]: Group } = {}
  fileName = ''

  constructor(filePath: string) {
    this.fileName = filePath.split('/')[filePath.split('/').length - 1]
    let data = ''
    let currentGroup = ''

    try {
      data = fs.readFileSync(filePath, 'utf8')
    } catch (err) {
      console.error(err)
    }

    data?.split(/\r?\n/).forEach((line, index) => {
      if (index == 0) return this.ignoredLines++

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const splitted: [string, string, string, string] = line.split(' ')

      if (line[0] == 'g') currentGroup = splitted[1]
      else if (line[0] != 'f') currentGroup = ''

      if (line[0] == 'v') {
        this.vertices.push(this.parseVertexLine(splitted))
      } else if (line[0] == 'f') {
        this.fanTriangulation().forEach((tri) => {
          if (currentGroup) {
            return this.groups[currentGroup].addChild(tri)
          }
          this.defaultGroup.addChild(tri)
        })
      } else if (line[0] == 'g' && splitted.length > 1) {
        currentGroup = splitted[1]
        this.groups[currentGroup] = new Group({} as BaseShape)
      } else {
        this.ignoredLines++
      }
    })
  }

  objToGroup(): Group {
    const g = new Group()

    g.name = this.fileName
    this.defaultGroup.children.forEach(
      (child, i) => i != 0 && g.addChild(child)
    )
    Object.keys(this.groups).forEach((key) => {
      this.groups[key].name = key
      g.addChild(this.groups[key])
    })

    return g
  }

  private fanTriangulation(): Triangle[] {
    const triangles = []
    for (let i = 2; i <= this.vertices.length - 2; i++) {
      const tri = new Triangle(
        this.vertices[1],
        this.vertices[i],
        this.vertices[i + 1]
      )
      triangles.push(tri)
    }
    return triangles
  }

  private parseVertexLine(entities: [string, string, string, string]): Point {
    return new Point(
      Number(entities[1]),
      Number(entities[2]),
      Number(entities[3])
    )
  }
}
