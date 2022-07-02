import { Point, Vector } from '../tuples'
import { Ray } from '../rays'

describe('Rays', () => {
  it('should create and query a ray', () => {
    const origin = new Point(1, 2, 3)
    const direction = new Vector(4, 5, 6)
    const ray = new Ray(origin, direction)
    expect(ray.origin).toEqual(origin)
    expect(ray.direction).toEqual(direction)
  })

  it('should compute a point from a distance', () => {
    const ray = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0))
    expect(ray.position(0)).toEqual(new Point(2, 3, 4))
  })
})
