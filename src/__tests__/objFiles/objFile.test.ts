import { ParseObjFile } from '../../objectFile'
import * as path from 'path'
import { Point, Vector } from '../../tuples'
import { Triangle } from '../../triangles/Triangle'

describe('obj file', () => {
  it('should ignore unrecognized lines', () => {
    const parser = new ParseObjFile(
      path.join(__dirname, './gibberishAfileContaining.obj')
    )

    expect(parser.ignoredLines).toBe(6)
  })

  it('checks vertex records', () => {
    const parser = new ParseObjFile(path.join(__dirname, './vertexRecords.obj'))
    expect(parser.vertices[1]).toEqual(new Point(-1, 1, 0))
    expect(parser.vertices[2]).toEqual(new Point(-1, 0.5, 0))
    expect(parser.vertices[3]).toEqual(new Point(1, 0, 0))
    expect(parser.vertices[4]).toEqual(new Point(1, 1, 0))
  })

  it('should parse triangle faces', () => {
    const parser = new ParseObjFile(
      path.join(__dirname, './parseTriangleFaces.obj')
    )

    const g = parser.defaultGroup
    const t1 = g.children[1] as Triangle
    const t2 = g.children[2] as Triangle

    expect(t1.p1).toEqual(parser.vertices[1])
    expect(t1.p2).toEqual(parser.vertices[2])
    expect(t1.p3).toEqual(parser.vertices[3])

    expect(t2.p1).toEqual(parser.vertices[1])
    expect(t2.p2).toEqual(parser.vertices[3])
    expect(t2.p3).toEqual(parser.vertices[4])

    expect(parser.ignoredLines).toBe(3)
  })

  it('should triangulate polygons', () => {
    const parser = new ParseObjFile(
      path.join(__dirname, './triangulatingPolygons.obj')
    )

    const g = parser.defaultGroup
    const t1 = g.children[1] as Triangle
    const t2 = g.children[2] as Triangle
    const t3 = g.children[3] as Triangle

    expect(t1.p1).toEqual(parser.vertices[1])
    expect(t1.p2).toEqual(parser.vertices[2])
    expect(t1.p3).toEqual(parser.vertices[3])

    expect(t2.p1).toEqual(parser.vertices[1])
    expect(t2.p2).toEqual(parser.vertices[3])
    expect(t2.p3).toEqual(parser.vertices[4])

    expect(t3.p1).toEqual(parser.vertices[1])
    expect(t3.p2).toEqual(parser.vertices[4])
    expect(t3.p3).toEqual(parser.vertices[5])
  })

  it('should check triangles in groups', () => {
    const parser = new ParseObjFile(path.join(__dirname, './triangles.obj'))
    const g1 = Object.values(parser.groups)[0]
    const g2 = Object.values(parser.groups)[1]
    const t1 = g1.children[1] as Triangle
    const t2 = g2.children[1] as Triangle

    expect(t1.p1).toEqual(parser.vertices[1])
    expect(t1.p2).toEqual(parser.vertices[2])
    expect(t1.p3).toEqual(parser.vertices[3])

    expect(t2.p1).toEqual(parser.vertices[1])
    expect(t2.p2).toEqual(parser.vertices[2])
    expect(t2.p3).toEqual(parser.vertices[3])
  })

  it('should convert an OBJ file to a group', () => {
    const parser = new ParseObjFile(path.join(__dirname, './triangles.obj'))
    const g = parser.objToGroup()
    expect(g.children[0]?.name).toBe('FirstGroup')
    expect(g.children[1]?.name).toBe('SecondGroup')
  })

  it('Vertex normal records', () => {
    const parser = new ParseObjFile(path.join(__dirname, './vn.obj'))
    expect(parser.normals[1]).toEqual(new Vector(0, 0, 1))
    expect(parser.normals[2]).toEqual(new Vector(0.707, 0, -0.707))
    expect(parser.normals[3]).toEqual(new Vector(1, 2, 3))
  })
})
