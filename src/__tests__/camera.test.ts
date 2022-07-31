import { Camera } from '../camera'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { Point, Vector } from '../tuples'
import { toFixed } from '../utils'

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
})
