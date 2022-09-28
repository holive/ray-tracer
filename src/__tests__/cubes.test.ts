import { Cube } from '../cubes'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'

describe('Cubes', () => {
  it('checks if a ray intersects a cube', () => {
    const cases = {
      positiveX: {
        origin: new Point(5, 0.5, 0),
        direction: new Vector(-1, 0, 0),
        t1: 4,
        t2: 6
      },
      negativeX: {
        origin: new Point(-5, 0.5, 0),
        direction: new Vector(1, 0, 0),
        t1: 4,
        t2: 6
      },

      positiveY: {
        origin: new Point(0.5, 5, 0),
        direction: new Vector(0, -1, 0),
        t1: 4,
        t2: 6
      },
      negativeY: {
        origin: new Point(0.5, -5, 0),
        direction: new Vector(0, 1, 0),
        t1: 4,
        t2: 6
      },

      positiveZ: {
        origin: new Point(0.5, 0, 5),
        direction: new Vector(0, 0, -1),
        t1: 4,
        t2: 6
      },
      negativeZ: {
        origin: new Point(0.5, 0, -5),
        direction: new Vector(0, 0, 1),
        t1: 4,
        t2: 6
      },

      inside: {
        origin: new Point(0, 0.5, 0),
        direction: new Vector(0, 0, 1),
        t1: -1,
        t2: 1
      }
    }

    Object.values(cases).forEach((ctx) => {
      const c = new Cube()
      const r = new Ray(ctx.origin, ctx.direction)
      const xs = c.localIntersect(r)
      expect(xs.length).toBe(2)
      expect(xs[0].t).toBe(ctx.t1)
      expect(xs[1].t).toBe(ctx.t2)
    })
  })

  it('checks if a ray misses a cube', () => {
    const cases = [
      {
        origin: new Point(-2, 0, 0),
        direction: new Vector(0.2673, 0.5345, 0.8018)
      },
      {
        origin: new Point(0, -2, 0),
        direction: new Vector(0.8018, 0.2673, 0.5345)
      },
      {
        origin: new Point(0, 0, -2),
        direction: new Vector(0.5345, 0.8018, 0.2673)
      },
      {
        origin: new Point(2, 0, 2),
        direction: new Vector(0, 0, -1)
      },
      {
        origin: new Point(0, 2, 2),
        direction: new Vector(0, -1, 0)
      },
      {
        origin: new Point(2, 2, 0),
        direction: new Vector(-1, 0, 0)
      }
    ]

    cases.forEach((cs) => {
      const c = new Cube()
      const r = new Ray(cs.origin, cs.direction)
      const xs = c.localIntersect(r)
      expect(xs.length).toBe(0)
    })
  })

  it('checks the normal on the surface of a cube', () => {
    const cases = [
      { point: new Point(1, 0.5, -0.8), normal: new Vector(1, 0, 0) },
      { point: new Point(-1, -0.2, 0.9), normal: new Vector(-1, 0, 0) },
      { point: new Point(-0.4, 1, -0.1), normal: new Vector(0, 1, 0) },
      { point: new Point(0.3, -1, -0.7), normal: new Vector(0, -1, 0) },
      { point: new Point(-0.6, 0.3, 1), normal: new Vector(0, 0, 1) },
      { point: new Point(0.4, 0.4, -1), normal: new Vector(0, 0, -1) },
      { point: new Point(1, 1, 1), normal: new Vector(1, 0, 0) },
      { point: new Point(-1, -1, -1), normal: new Vector(-1, 0, 0) }
    ]

    cases.forEach((cs) => {
      const c = new Cube()
      const p = cs.point
      const normal = c.localNormalAt(p)
      expect(normal).toEqual(cs.normal)
    })
  })
})
