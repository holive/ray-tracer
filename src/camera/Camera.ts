import { IDENTITY_MATRIX, MatrixTypeFour } from '../matrices'
import { toFixed } from '../utils'

export class Camera {
  hSize: number
  vSize: number
  fieldOfView: number
  transform: MatrixTypeFour = IDENTITY_MATRIX
  pixelSize: number
  halfWidth: number
  halfHeight: number

  constructor(hSize: number, vSize: number, fieldOfView: number) {
    this.hSize = hSize
    this.vSize = vSize
    this.fieldOfView = fieldOfView

    const halfView = Math.tan(fieldOfView / 2)
    const aspect = hSize / vSize
    if (aspect >= 1) {
      this.halfWidth = halfView
      this.halfHeight = halfView / aspect
    } else {
      this.halfWidth = halfView * aspect
      this.halfHeight = halfView
    }

    this.pixelSize = toFixed((this.halfWidth * 2) / hSize)
  }
}
