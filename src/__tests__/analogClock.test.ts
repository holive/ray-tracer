import { Canvas } from '../canvas'
import { ALMOST_WHITE, GRAY, Point, WHITE } from '../tuples'
import { degreesToRadians } from '../utils'
import { MatrixTypeFour, Matrix } from '../Matrices'

describe('build a analog clock to put together matrices operations', () => {
  it('write the clock in the ppm file', () => {
    const width = 1000
    const height = 1000
    const c = new Canvas(width, height)
    const initialPosition = new Point(0, width * 0.1 * 4, 0)

    for (let pointer = 0; pointer <= 360; pointer += 30) {
      const transformMatrix = new Matrix(
        transformationMatrix(width * 0.5, height * 0.5, -pointer)
      )
      const transformed = transformMatrix.multiplyByTuple(initialPosition)

      writePixel(
        c,
        Number(transformed.x.toFixed()),
        Number(transformed.y.toFixed())
      )
    }

    c.toPPM()
  })
})

function transformationMatrix(
  toX: number,
  toY: number,
  rotation: number
): MatrixTypeFour {
  const r = Matrix.rotationZ(degreesToRadians(rotation))
  const s = Matrix.scaling(1, 1, 1)
  const t = Matrix.translation(toX, toY, 0)

  return new Matrix(new Matrix(t).multiply(s)).multiply(r)
}

function writePixel(c: Canvas, x: number, y: number) {
  c.writePixel(x, y, WHITE)

  c.writePixel(x - 1, y, ALMOST_WHITE)
  c.writePixel(x + 1, y, ALMOST_WHITE)
  c.writePixel(x, y - 1, ALMOST_WHITE)
  c.writePixel(x, y + 1, ALMOST_WHITE)

  c.writePixel(x + 1, y + 1, GRAY)
  c.writePixel(x + 1, y - 1, GRAY)
  c.writePixel(x - 1, y + 1, GRAY)
  c.writePixel(x - 1, y - 1, GRAY)
}
