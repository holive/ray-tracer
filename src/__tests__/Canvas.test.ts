import { Canvas } from '../canvas'
import { BLACK, Color, WHITE } from '../tuples'
import { scaleColorValue } from '../canvas/helpers'

const COLOR_START_LINE = 3

describe('Canvas', () => {
  it('should create a canvas', () => {
    const c = new Canvas(10, 20)
    expect(c.width).toBe(10)
    expect(c.height).toBe(20)

    c.getCanvas().map((row) => row.map((col) => expect(col).toEqual(BLACK)))
  })

  it('should write pixels to a canvas', () => {
    const c = new Canvas(4, 8)
    const red = scaleColorValue(new Color(1, 0, 0))

    c.writePixel(2, 3, red)
    expect(c.pixelAt(2, 3)).toEqual(red)
  })

  it('should construct the PPM header', () => {
    const ppm = new Canvas(5, 3).toPPM().split('\n')
    expect(ppm[0]).toBe('P3')
    expect(ppm[1]).toBe('5 3')
    expect(ppm[2]).toBe('255')
  })

  it('should construct the PPM pixel data', () => {
    const c = new Canvas(5, 3)
    const c1 = new Color(1.5, 0, 0)
    const c2 = new Color(0, 0.5, 0)
    const c3 = new Color(-0.5, 0, 1)

    c.writePixel(0, 0, c1)
    c.writePixel(2, 1, c2)
    c.writePixel(4, 2, c3)

    const ppm = c.toPPM()
    const lines = ppm.split('\n')

    expect(lines[COLOR_START_LINE]).toBe('0 0 0 0 0 0 0 0 0 0 0 0 0 0 255')
    expect(lines[COLOR_START_LINE + 1]).toBe('0 0 0 0 0 0 0 128 0 0 0 0 0 0 0')
    expect(lines[COLOR_START_LINE + 2]).toBe('255 0 0 0 0 0 0 0 0 0 0 0 0 0 0')
    expect(ppm.substring(ppm.length - 1)).toBe('\n') // some image programs require a new line character at the end
  })

  it('should not write more than 70 characters per line', () => {
    const width = 100
    const c = new Canvas(width, 1)
    for (let i = 0; i < width; i++) {
      c.writePixel(i, 0, WHITE)
    }

    const ppm = c.toPPM().split('\n')
    expect(ppm[COLOR_START_LINE].length < 70).toBeTruthy()
  })
})
