import { Cone } from '../cones'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'

describe('cones', () => {
  it('intersects a cone with a ray', () => {
    const cases = [
      {
        origin: new Point(0, 0, -5),
        direction: new Vector(0, 0, 1),
        t0: 5,
        t1: 5
      },
      {
        origin: new Point(0, 0, -5),
        direction: new Vector(1, 1, 1),
        t0: 8.660254037844386,
        t1: 8.660254037844386
      }
    ]

    cases.forEach((cs) => {
      const shape = new Cone()
      const direction = cs.direction.normalize()
      const r = new Ray(cs.origin, direction)
      const xs = shape.localIntersect(r)
      expect(xs.length).toBe(2)
      expect(xs[0].t).toEqual(cs.t0)
      expect(xs[1].t).toEqual(cs.t1)
    })
  })

  it('intersects a cone with a ray parallel to one of ots halves', () => {
    const shape = new Cone()
    const direction = new Vector(0, 1, 1).normalize()
    const r = new Ray(new Point(0, 0, -1), direction)
    const xs = shape.localIntersect(r)
    expect(xs.length).toBe(1)
    expect(xs[0].t).toBe(0.3535533905932738)
  })

  it("intersects a cone's end caps", () => {
    const cases = [
      {
        origin: new Point(0, 0, -5),
        direction: new Vector(0, 1, 0),
        count: 0
      },
      {
        origin: new Point(0, 0, -0.25),
        direction: new Vector(0, 1, 1),
        count: 2
      },
      {
        origin: new Point(0, 0, -0.25),
        direction: new Vector(0, 1, 0),
        count: 4
      }
    ]

    cases.forEach((cs) => {
      const shape = new Cone()
      shape.minimum = -0.5
      shape.maximum = 0.5
      shape.closed = true
      const direction = cs.direction.normalize()
      const r = new Ray(cs.origin, direction)
      const xs = shape.localIntersect(r)
      expect(xs.length).toBe(cs.count)
    })
  })

  it('computes the normal vector on a cone', () => {
    const cases = [
      {
        point: new Point(0, 0, 0),
        normal: new Vector(0, 0, 0)
      },
      {
        point: new Point(1, 1, 1),
        normal: new Vector(1, -Math.sqrt(2), 1)
      },
      {
        point: new Point(-1, -1, 0),
        normal: new Vector(-1, 1, 0)
      }
    ]

    cases.forEach((cs) => {
      const shape = new Cone()
      const n = shape.localNormalAt(cs.point)
      expect(n).toEqual(cs.normal)
    })
  })

  it('checks if an unbounded cone has a bounding box', () => {
    const shape = new Cone()
    const box = shape.boundsOf()
    expect(box.min).toEqual(new Point(-Infinity, -Infinity, -Infinity))
    expect(box.max).toEqual(new Point(Infinity, Infinity, Infinity))
  })

  it('checks if a bounded cone has a bounding box', () => {
    const shape = new Cone(-5, 3)
    const box = shape.boundsOf()
    expect(box.min).toEqual(new Point(-5, -5, -5))
    expect(box.max).toEqual(new Point(5, 3, 5))
  })
})
