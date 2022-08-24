import { Color, Point } from '../tuples'
import { Pattern } from './Pattern'
import { BaseShape } from '../shapes'
import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'

export class StripePattern extends Pattern {
  protected transform: MatrixTypeFour = IDENTITY_MATRIX

  setPatternTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }

  stripeAt(point: Point): Color {
    if (Math.floor(point.x) % 2 == 0) {
      return this.a
    }
    return this.b
  }

  stripeAtObject(object: BaseShape, worldPoint: Point): Color {
    const objectPoint = new Matrix(
      Matrix.inverse(object.getTransform()) as MatrixTypeFour
    ).multiplyByTuple(worldPoint)

    const patternPoint = new Matrix(
      Matrix.inverse(this.transform) as MatrixTypeFour
    ).multiplyByTuple(objectPoint)

    return this.stripeAt(patternPoint)
  }
}
