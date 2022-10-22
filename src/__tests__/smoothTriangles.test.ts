import { Point, Vector } from '../tuples'
import { SmoothTriangle } from '../triangles/SmoothTriangle'
import { Ray } from '../rays'
import { Intersection } from '../intersections'

function sut() {
  const p1 = new Point(0, 1, 0)
  const p2 = new Point(-1, 0, 0)
  const p3 = new Point(1, 0, 0)
  const n1 = new Vector(0, 1, 0)
  const n2 = new Vector(-1, 0, 0)
  const n3 = new Vector(1, 0, 0)
  const tri = new SmoothTriangle(p1, p2, p3, n1, n2, n3)
  return { tri, p1, p2, p3, n1, n2, n3 }
}

describe('smooth Triangles', () => {
  it('should construct a smooth triangle', () => {
    const { tri, p1, p2, p3, n1, n2, n3 } = sut()
    expect(tri.p1).toEqual(p1)
    expect(tri.p2).toEqual(p2)
    expect(tri.p3).toEqual(p3)
    expect(tri.n1).toEqual(n1)
    expect(tri.n2).toEqual(n2)
    expect(tri.n3).toEqual(n3)
  })

  it('checks if an intersection with a smooth triangle stores u/v', () => {
    const { tri } = sut()
    const r = new Ray(new Point(-0.2, 0.3, -2), new Vector(0, 0, 1))
    const xs = tri.localIntersect(r)
    expect(Number(xs[0].u?.toFixed(2))).toBe(0.45)
    expect(Number(xs[0].v?.toFixed(2))).toBe(0.25)
  })

  it('checks if a smooth triangle uses u/v to interpolate the normal', () => {
    const { tri } = sut()
    const i = new Intersection(1, tri, 0.45, 0.25)
    const n = tri.normalAt(new Point(0, 0, 0), i)
    expect(n.toFixed(5)).toEqual(new Vector(-0.5547, 0.83205, 0))
  })

  it('should prepare the normal on a smooth triangle', () => {
    const { tri } = sut()
    const i = new Intersection(1, tri, 0.45, 0.25)
    const r = new Ray(new Point(-0.2, 0.3, -2), new Vector(0, 0, 1))
    const xs = Intersection.intersections(i)
    const comps = i.prepareComputations(r, xs)
    expect(comps.normalV.toFixed(5)).toEqual(new Vector(-0.5547, 0.83205, 0))
  })
})
