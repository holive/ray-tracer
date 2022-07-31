import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { toFixed } from '../utils'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'

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

    this.pixelSize = (this.halfWidth * 2) / hSize
  }

  rayForPixel(px: number, py: number): Ray {
    // the offset from the edge of the canvas to the pixel's center
    const xOffset = (px + 0.5) * this.pixelSize
    const yOffset = (py + 0.5) * this.pixelSize

    // the untransformed coordinates of the pixel in world space.
    // (the camera looks toward -z, so +x is to the left)
    const worldX = toFixed(this.halfWidth - xOffset)
    const worldY = toFixed(this.halfHeight - yOffset)

    // transform the canvas point and the origin, and then compute the ray's direction vector.
    const transformMatrix = new Matrix(
      Matrix.inverse(this.transform) as MatrixTypeFour
    )
    const pixel = transformMatrix.multiplyByTuple(new Point(worldX, worldY, -1))
    const origin = transformMatrix.multiplyByTuple(new Point(0, 0, 0))

    const direction = pixel.subtract(origin)
    const normalizedDirection = new Vector(
      direction.x,
      direction.y,
      direction.z
    )

    return new Ray(origin, normalizedDirection)
  }
}
