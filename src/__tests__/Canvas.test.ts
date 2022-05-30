import { Canvas } from '../Canvas'
import { BLACK, Color } from '../tuples'

describe('Canvas', () => {
  it('should create a canvas', () => {
    const c = new Canvas(10, 20)
    expect(c.width).toBe(10)
    expect(c.height).toBe(20)

    c.canvas.map((row) => row.map((col) => expect(col).toEqual(BLACK)))
  })

  it('should write pixels to a canvas', () => {
    const c = new Canvas(10, 20)
    const red = new Color(1, 0, 0)
    c.writePixel(2, 3, red)
    expect(c.pixelAt(2, 3)).toEqual(red)
  })
})
