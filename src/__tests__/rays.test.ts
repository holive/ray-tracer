import { Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Matrix } from '../matrices'

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

  it('should translate a ray', () => {
    const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0))
    const matrix = Matrix.translation(3, 4, 5)
    const r2 = ray.transform(new Matrix(matrix))

    expect(r2.origin).toEqual(new Point(4, 6, 8))
    expect(r2.direction).toEqual(new Vector(0, 1, 0))
  })

  it('should scale a ray', () => {
    const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0))
    const matrix = Matrix.scaling(2, 3, 4)
    const r2 = ray.transform(new Matrix(matrix))

    expect(r2.origin).toEqual(new Point(2, 6, 12))
    expect(r2.direction).toEqual(new Vector(0, 3, 0))
  })
})
