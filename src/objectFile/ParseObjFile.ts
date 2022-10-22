import fs = require('fs')
import { Point, Vector } from '../tuples'
import { Group } from '../groups'
import { Triangle } from '../triangles/Triangle'
import { BaseShape } from '../shapes'

export class ParseObjFile {
  ignoredLines = 0
  vertices: Point[] = [{} as Point]
  normals: Vector[] = [{} as Vector]
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

      const splitted = line.split(' ')

      if (line[0] == 'g') currentGroup = splitted[1]
      else if (line[0] != 'f') currentGroup = ''

      switch (true) {
        case line.startsWith('vn'):
          this.normals.push(this.parseNormalsLine(splitted))
          break

        case line[0] == 'v':
          this.vertices.push(this.parseVertexLine(splitted))
          break

        case line[0] == 'f':
          this.fanTriangulation().forEach((tri) => {
            if (currentGroup) return this.groups[currentGroup].addChild(tri)
            this.defaultGroup.addChild(tri)
          })
          break

        case line[0] == 'g' && splitted.length > 1:
          currentGroup = splitted[1]
          this.groups[currentGroup] = new Group({} as BaseShape)
          break

        default:
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

  private parseVertexLine(entities: string[]): Point {
    return new Point(
      Number(entities[1]),
      Number(entities[2]),
      Number(entities[3])
    )
  }

  private parseNormalsLine(entities: string[]): Vector {
    return new Vector(
      Number(entities[1]),
      Number(entities[2]),
      Number(entities[3])
    )
  }
}
