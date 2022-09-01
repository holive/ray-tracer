import { Camera } from '../camera'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { Color, Point, Vector } from '../tuples'
import { DefaultWord } from '../world/DefaultWord'
import { viewTransform } from '../transformations'

describe('Camera', () => {
  it('constructs a camera', () => {
    const hSize = 160
    const vSize = 120
    const fieldOfView = Math.PI / 2
    const c = new Camera(hSize, vSize, fieldOfView)

    expect(c.hSize).toBe(160)
    expect(c.vSize).toBe(120)
    expect(c.fieldOfView).toBe(Math.PI / 2)
    expect(c.transform).toEqual(IDENTITY_MATRIX)
  })

  it('checks the pixel size for a horizontal canvas', () => {
    const c = new Camera(200, 125, Math.PI / 2)
    expect(c.pixelSize).toBe(0.01)
  })

  it('checks the pixel size for a vertical canvas', () => {
    const c = new Camera(200, 125, Math.PI / 2)
    expect(c.pixelSize).toBe(0.01)
  })

  it('constructs a ray through the center of the canvas', () => {
    const c = new Camera(201, 101, Math.PI / 2)
    const r = c.rayForPixel(100, 50)
    expect(r.origin).toEqual(new Point(0, 0, 0))
    expect(r.direction.toFixed(4)).toEqual(new Vector(0, 0, -1))
  })

  it('constructs a ray through a corner of the canvas', () => {
    const c = new Camera(201, 101, Math.PI / 2)
    const r = c.rayForPixel(0, 0)
    expect(r.origin).toEqual(new Point(0, 0, 0))
    expect(r.direction.toFixed()).toEqual(
      new Vector(0.66518, 0.33259, -0.66851)
    )
  })

  it('constructs a ray when the camera is transformed', () => {
    const c = new Camera(201, 101, Math.PI / 2)
    c.transform = new Matrix(Matrix.rotationY(Math.PI / 4)).multiply(
      Matrix.translation(0, -2, 5)
    )
    const r = c.rayForPixel(100, 50)
    expect(r.origin).toEqual(new Point(0, 2, -5))
    expect(r.direction.toFixed(4)).toEqual(new Vector(0.7071, 0, -0.7071))
  })

  it('should render a world with a camera', () => {
    const w = new DefaultWord()
    const c = new Camera(11, 11, Math.PI / 2)
    const from = new Point(0, 0, -5)
    const to = new Point(0, 0, 0)
    const up = new Vector(0, 1, 0)
    c.transform = viewTransform(from, to, up)
    const image = c.render(w)
    expect(image.pixelAt(5, 5)).toEqual(
      new Color(0.38066, 0.47583, 0.2855).rgb()
    )
  })
})
