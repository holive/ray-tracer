import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'
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

    const transformMatrix = new Matrix(
      Matrix.inverse(this.transform) as MatrixTypeFour
    )
    const pixel = transformMatrix.multiplyByTuple(new Point(worldX, worldY, -1))
    const origin = transformMatrix.multiplyByTuple(new Point(0, 0, 0))

    const { x, y, z } = pixel.subtract(origin)
    const normalizedDirection = new Vector(x, y, z).normalize()

    return new Ray(origin, normalizedDirection)
  }

  render(world: World): Canvas {
    const image = new Canvas(this.hSize, this.vSize)

    for (let y = 0; y <= this.vSize - 1; y++) {
      for (let x = 0; x <= this.hSize - 1; x++) {
        const ray = this.rayForPixel(x, y)
        const color = world.colorAt(ray)
        image.writePixel(x, y, color)
      }
    }

    return image
  }
}
