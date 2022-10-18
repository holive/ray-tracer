import fs = require('fs')
import { Point } from '../tuples'
import { Group } from '../groups'
import { Triangle } from '../triangles/Triangle'
import { BaseShape } from '../shapes'

export class ParseObjFile {
  ignoredLines = 0
  vertices: Point[] = [null as unknown as Point]
  defaultGroup = new Group(new BaseShape()) // fillers first element

  constructor(filePath: string) {
    let data = ''

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

      if (line[0] == 'v') {
        this.vertices.push(this.parseVertexLine(splitted))
      } else if (line[0] == 'f') {
        this.fanTriangulation().forEach((tri) => {
          this.defaultGroup.addChild(tri)
        })
      } else {
        this.ignoredLines++
      }
    })
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
