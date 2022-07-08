import { Point } from '../tuples'

import { IDENTITY_MATRIX, MatrixTypeFour } from '../matrices'

export class Sphere {
  position = new Point(0, 0, 0)
  private transform: MatrixTypeFour = IDENTITY_MATRIX

  getTransform(): MatrixTypeFour {
    return this.transform
  }

  setTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }
}
