import fs = require('fs')
import { Point, Vector } from '../tuples'
import { Group } from '../groups'
import { Triangle } from '../triangles/Triangle'
import { BaseShape } from '../shapes'
import { SmoothTriangle } from '../triangles/SmoothTriangle'

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
          this.fanTriangulation(splitted).forEach((tri) => {
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

  private fanTriangulation(splitted: string[]): Triangle[] {
    const triangles = []
    const isSmooth = splitted[1].indexOf('/') != -1

    for (let i = 2; i <= this.vertices.length - 2; i++) {
      const p1 = this.vertices[1]
      const p2 = this.vertices[i]
      const p3 = this.vertices[i + 1]

      if (isSmooth) {
        const n1 = splitted[1].split('/')[2]
        const n2 = splitted[2].split('/')[2]
        const n3 = splitted[3].split('/')[2]

        const normal1 = this.normals[Number(n1)]
        const normal2 = this.normals[Number(n2)]
        const normal3 = this.normals[Number(n3)]

        triangles.push(
          new SmoothTriangle(p1, p2, p3, normal1, normal2, normal3)
        )
      } else {
        triangles.push(new Triangle(p1, p2, p3))
      }
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
