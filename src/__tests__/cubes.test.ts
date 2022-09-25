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
})
