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
})
