import { Point, Vector } from '../tuples'
import { Triangle } from '../triangles/Triangle'
import { Ray } from '../rays'

describe('Triangles', () => {
  it('constructs a triangle', () => {
    const p1 = new Point(0, 1, 0)
    const p2 = new Point(-1, 0, 0)
    const p3 = new Point(1, 0, 0)
    const t = new Triangle(p1, p2, p3)
    expect(t.p1).toEqual(p1)
    expect(t.p2).toEqual(p2)
    expect(t.p3).toEqual(p3)

    expect(t.e1).toEqual(new Vector(-1, -1, 0))
    expect(t.e2).toEqual(new Vector(1, -1, 0))
    expect(t.normal).toEqual(new Vector(0, 0, -1))
  })

  it('fiding the normal on a triangle', () => {
    const t = new Triangle(
      new Point(0, 1, 0),
      new Point(-1, 0, 0),
      new Point(1, 0, 0)
    )
    const n1 = t.localNormalAt(new Point(0, 0.5, 0))
    const n2 = t.localNormalAt(new Point(-0.5, 0.75, 0))
    const n3 = t.localNormalAt(new Point(0.5, 0.25, 0))
    expect(n1).toEqual(t.normal)
    expect(n2).toEqual(t.normal)
    expect(n3).toEqual(t.normal)
  })

  it('intersects a ray parallel to the triangle', () => {
    const t = new Triangle(
      new Point(0, 1, 0),
      new Point(-1, 0, 0),
      new Point(1, 0, 0)
    )
    const r = new Ray(new Point(0, -1, -2), new Vector(0, 1, 0))
    const xs = t.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('a ray misses the p1-p3 edge', () => {
    const t = new Triangle(
      new Point(0, 1, 0),
      new Point(-1, 0, 0),
      new Point(1, 0, 0)
    )
    const r = new Ray(new Point(1, 1, -2), new Vector(0, 0, 1))
    const xs = t.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('checks if a ray misses the p1-p2 edge', () => {
    const t = new Triangle(
      new Point(0, 1, 0),
      new Point(-1, 0, 0),
      new Point(1, 0, 0)
    )
    const r = new Ray(new Point(-1, 1, -2), new Vector(0, 0, 1))
    const xs = t.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('checks if a ray misses the p2-p3 edge', () => {
    const t = new Triangle(
      new Point(0, 1, 0),
      new Point(-1, 0, 0),
      new Point(1, 0, 0)
    )
    const r = new Ray(new Point(0, -1, -2), new Vector(0, 0, 1))
    const xs = t.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('checks if a ray strikes a triangle', () => {
    const t = new Triangle(
      new Point(0, 1, 0),
      new Point(-1, 0, 0),
      new Point(1, 0, 0)
    )
    const r = new Ray(new Point(0, 0.5, -2), new Vector(0, 0, 1))
    const xs = t.localIntersect(r)
    expect(xs.length).toBe(1)
    expect(xs[0].t).toBe(2)
  })

  it('checks if a triangle has a bounding box', () => {
    const p1 = new Point(-3, 7, 2)
    const p2 = new Point(6, 2, -4)
    const p3 = new Point(2, -1, -1)
    const shape = new Triangle(p1, p2, p3)
    const box = shape.boundsOf()
    expect(box.min).toEqual(new Point(-3, -1, -4))
    expect(box.max).toEqual(new Point(6, 7, 2))
  })
})
