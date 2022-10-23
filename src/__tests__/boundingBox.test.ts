import { BoundingBox } from '../bounds'
import { Point } from '../tuples'

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
})
