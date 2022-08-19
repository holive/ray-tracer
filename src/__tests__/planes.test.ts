import { Plane } from '../plane'
import { Point, Vector } from '../tuples'
import { Ray } from '../rays'

describe('Plane', () => {
  it('shoud check if the normal of a plane is constant everywhere', () => {
    const p = new Plane()
    const n1 = p.localNormalAt(new Point(0, 0, 0))
    const n2 = p.localNormalAt(new Point(10, 0, -10))
    const n3 = p.localNormalAt(new Point(-5, 0, 150))

    expect(n1).toEqual(new Vector(0, 1, 0))
    expect(n2).toEqual(new Vector(0, 1, 0))
    expect(n3).toEqual(new Vector(0, 1, 0))
  })

  it('shoud intersect with a plane parallel to the plane', () => {
    const p = new Plane()
    const r = new Ray(new Point(0, 10, 0), new Vector(0, 0, 1))
    const xs = p.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('shoud intersect with a coplanar ray', () => {
    const p = new Plane()
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const xs = p.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('shoud check if a ray intersects a plane from above', () => {
    const p = new Plane()
    const r = new Ray(new Point(0, 1, 0), new Vector(0, -1, 0))
    const xs = p.localIntersect(r)
    expect(xs.length).toBe(1)
    expect(xs[0].t).toBe(1)
    expect(xs[0].object).toEqual(p)
  })

  it('shoud check if a ray intersects a plane from below', () => {
    const p = new Plane()
    const r = new Ray(new Point(0, -1, 0), new Vector(0, 1, 0))
    const xs = p.localIntersect(r)
    expect(xs.length).toBe(1)
    expect(xs[0].t).toBe(1)
    expect(xs[0].object).toEqual(p)
  })
})
