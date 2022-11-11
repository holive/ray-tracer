import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { Ray } from '../rays'
import { Point } from '../tuples'
import { World } from '../world'
import { Canvas } from '../canvas'
import { toFixed } from '../utils'

export class Camera {
  hSize: number
  vSize: number
  fieldOfView: number
  transform: MatrixTypeFour = IDENTITY_MATRIX
  pixelSize: number
  halfWidth: number
  halfHeight: number
  inverseTransformMatrix?: Matrix

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

  rayForPixel(px: number, py: number): Ray {
    const xOffset = (px + 0.5) * this.pixelSize
    const yOffset = (py + 0.5) * this.pixelSize
    const worldX = this.halfWidth - xOffset
    const worldY = this.halfHeight - yOffset

    if (!this.inverseTransformMatrix) {
      this.inverseTransformMatrix = new Matrix(
        Matrix.inverse(this.transform) as MatrixTypeFour
      )
    }

    const pixel = this.inverseTransformMatrix.multiplyByTupleV(
      new Point(worldX, worldY, -1)
    )
    const origin = this.inverseTransformMatrix.multiplyByTupleP(
      new Point(0, 0, 0)
    )

    return new Ray(origin, pixel.subtractV(origin).normalize())
  }

  render(world: World): Canvas {
    const image = new Canvas(this.hSize, this.vSize)

    console.log(this.hSize * this.vSize)

    for (let y = 0; y <= this.vSize - 1; y++) {
      console.log(y)
      for (let x = 0; x <= this.hSize - 1; x++) {
        const ray = this.rayForPixel(x, y)
        const color = world.colorAt(ray)
        image.writePixel(x, y, color)
      }
    }

    return image
  }
}
