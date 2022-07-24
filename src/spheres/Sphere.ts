import { Point, Vector } from '../tuples'

import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { toFixed } from '../utils'
import { Material } from '../lights'

export class Sphere {
  material = new Material()
  position = new Point(0, 0, 0)
  private transform: MatrixTypeFour = IDENTITY_MATRIX

  getTransform(): MatrixTypeFour {
    return this.transform
  }

  setTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }

  normalAt(p: Point): Vector {
    const objectPoint = new Matrix(
      Matrix.inverse(this.transform) as MatrixTypeFour
    ).multiplyByTuple(p)

    const objectNormal = objectPoint.subtract(this.position)

    const worldNormal = new Matrix(
      new Matrix(
        Matrix.inverse(this.transform) as MatrixTypeFour
      ).transpose<MatrixTypeFour>()
    ).multiplyByTuple(objectNormal)

    return new Vector(
      toFixed(worldNormal.x),
      toFixed(worldNormal.y),
      toFixed(worldNormal.z)
    ).normalize()
  }
}
