import { BoundingBox } from '../bounds'
import { Point } from '../tuples'
import { Matrix } from '../matrices'

describe('Bounds', () => {
  it('should create an empty bounding box', () => {
    const box = new BoundingBox()
    expect(box.min).toEqual(new Point(Infinity, Infinity, Infinity))
    expect(box.max).toEqual(new Point(-Infinity, -Infinity, -Infinity))
  })

  it('should create a bounding box with volume', () => {
    const box = new BoundingBox(new Point(-1, -2, -3), new Point(3, 2, 1))
    expect(box.min).toEqual(new Point(-1, -2, -3))
    expect(box.max).toEqual(new Point(3, 2, 1))
  })

  it('should add points to an empty bounding box', () => {
    const box = new BoundingBox()
    const p1 = new Point(-5, 2, 0)
    const p2 = new Point(7, 0, -3)
    box.addPoint(p1)
    box.addPoint(p2)
    expect(box.min).toEqual(new Point(-5, 0, -3))
    expect(box.max).toEqual(new Point(7, 2, 0))
  })

  it('should add one bounding box to another', () => {
    const box1 = new BoundingBox(new Point(-5, -2, 0), new Point(7, 4, 4))
    const box2 = new BoundingBox(new Point(8, -7, -2), new Point(14, 2, 8))
    box1.addBox(box2)
    expect(box1.max).toEqual(new Point(14, 4, 8))
  })

  it('should check it a box contains a given point', () => {
    const box = new BoundingBox(new Point(5, -2, 0), new Point(11, 4, 7))
    const cases = [
      { point: new Point(5, -2, 0), result: true },
      { point: new Point(11, 4, 7), result: true },
      { point: new Point(8, 1, 3), result: true },
      { point: new Point(3, 0, 3), result: false },
      { point: new Point(8, -4, 3), result: false },
      { point: new Point(8, 1, -1), result: false },
      { point: new Point(13, 1, 3), result: false },
      { point: new Point(8, 5, 3), result: false },
      { point: new Point(8, 1, 8), result: false }
    ]

    cases.forEach((cs) => {
      expect(box.containsPoint(cs.point)).toBe(cs.result)
    })
  })

  it('should check to see if a box contains a given box', () => {
    const box = new BoundingBox(new Point(5, -2, 0), new Point(11, 4, 7))
    const cases = [
      { min: new Point(5, -2, 0), max: new Point(11, 4, 7), result: true },
      { min: new Point(6, -1, 1), max: new Point(10, 3, 6), result: true },
      { min: new Point(4, -3, -1), max: new Point(10, 3, 6), result: false },
      { min: new Point(6, -1, 1), max: new Point(12, 5, 8), result: false }
    ]

    cases.forEach(({ min, max, result }) => {
      const box2 = new BoundingBox(min, max)
      expect(box.containsBox(box2)).toBe(result)
    })
  })

  it('should transform a bounding box', () => {
    const box = new BoundingBox(new Point(-1, -1, -1), new Point(1, 1, 1))
    const matrix = Matrix.rotationXC(Math.PI / 4).multiply(
      Matrix.rotationY(Math.PI / 4)
    )
    const box2 = box.transform(matrix)
    expect(box2.min).toEqual(new Point(-1.41422, -1.70712, -1.70712))
    expect(box2.max).toEqual(new Point(1.41422, 1.70712, 1.70712))
  })
})
