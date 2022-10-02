import { Cylinder } from '../cylinders/cylinder'
import { Point, Vector } from '../tuples'
import { Ray } from '../rays'

describe('Cylinders', () => {
  it('checks if a ray misses a cylinder', () => {
    const cases = [
      {
        origin: new Point(1, 0, 0),
        direction: new Vector(0, 1, 0)
      },
      {
        origin: new Point(0, 0, 0),
        direction: new Vector(0, 1, 0)
      },
      {
        origin: new Point(0, 0, -5),
        direction: new Vector(1, 1, 1)
      }
    ]

    cases.forEach((cs) => {
      const cyl = new Cylinder()
      const direction = cs.direction.normalize()
      const r = new Ray(cs.origin, direction)
      const xs = cyl.localIntersect(r)
      expect(xs.length).toBe(0)
    })
  })

  it('checks if a ray strikes a cylinder', () => {
    const cases = [
      {
        origin: new Point(1, 0, -5),
        direction: new Vector(0, 0, 1),
        t0: 5,
        t1: 5
      },
      {
        origin: new Point(0, 0, -5),
        direction: new Vector(0, 0, 1),
        t0: 4,
        t1: 6
      },
      {
        origin: new Point(0.5, 0, -5),
        direction: new Vector(0.1, 1, 1),
        t0: 6.80798,
        t1: 7.08872
      }
    ]

    cases.forEach((cs) => {
      const cyl = new Cylinder()
      const direction = cs.direction.normalize()
      const r = new Ray(cs.origin, direction)
      const xs = cyl.localIntersect(r)
      expect(xs.length).toBe(2)
      expect(+xs[0].t.toFixed(5)).toBe(cs.t0)
      expect(+xs[1].t.toFixed(5)).toBe(cs.t1)
    })
  })

  it('finds normal vector on a cylinder', () => {
    const cases = [
      { point: new Point(1, 0, 0), normal: new Vector(1, 0, 0) },
      { point: new Point(0, 5, -1), normal: new Vector(0, 0, -1) },
      { point: new Point(0, -2, 1), normal: new Vector(0, 0, 1) },
      { point: new Point(-1, 1, 0), normal: new Vector(-1, 0, 0) }
    ]

    cases.forEach((cs) => {
      const cyl = new Cylinder()
      const n = cyl.localNormalAt(cs.point)
      expect(n).toEqual(cs.normal)
    })
  })
})
