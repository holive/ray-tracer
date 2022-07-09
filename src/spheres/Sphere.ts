import { Point, Vector } from '../tuples'

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

  normalAt(p: Point): Vector {
    const t = p.subtract(this.position)
    return new Vector(t.x, t.y, t.z).normalize()
  }
}
