import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { BaseShape } from '../shapes'
import { Color, Point } from '../tuples'

export class TestPattern {
  transform = IDENTITY_MATRIX

  setPatternTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }

  patternAtShape(object: BaseShape, point: Point): Color {
    const objectPoint = new Matrix(
      Matrix.inverse(object.getTransform()) as MatrixTypeFour
    ).multiplyByTuple(point)

    const patternPoint = new Matrix(
      Matrix.inverse(this.transform) as MatrixTypeFour
    ).multiplyByTuple(objectPoint)

    return this.patternAt(patternPoint)
  }

  patternAt({ x, y, z }: Point): Color {
    if (process.env.NODE_ENV != 'test') {
      throw new Error('stripeAtObject must be implemented in the subclass')
    }

    return new Color(x, y, z)
  }
}
