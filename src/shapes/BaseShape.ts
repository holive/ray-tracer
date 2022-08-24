import { Material } from '../lights'
import { Point, Vector } from '../tuples'
import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'
import { Ray } from '../rays'
import { Intersection } from '../intersections'

export class BaseShape {
  material = new Material()
  position = new Point(0, 0, 0)
  protected transform: MatrixTypeFour = IDENTITY_MATRIX
  savedRay: Ray = new Ray(this.position, new Vector(0, 0, 0))

  getTransform(): MatrixTypeFour {
    return this.transform
  }

  setTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }

  intersect(ray: Ray): Intersection[] {
    const localRay = ray.transform(
      new Matrix(Matrix.inverse(this.transform) as MatrixTypeFour)
    )
    return this.localIntersect(localRay)
  }

  localIntersect(localRay: Ray): Intersection[] {
    if (process.env.NODE_ENV != 'test') {
      throw new Error('localIntersect must be implemented in the subclass')
    }

    this.savedRay = localRay
    return []
  }

  localNormalAt(point: Point): Vector {
    if (process.env.NODE_ENV != 'test') {
      throw new Error('localNormalAt must be implemented in the subclass')
    }

    return new Vector(point.x, point.y, point.z)
  }

  normalAt(point: Point): Vector {
    const localPoint = new Matrix(
      Matrix.inverse(this.transform) as MatrixTypeFour
    ).multiplyByTuple(point)

    const localNormal = this.localNormalAt(localPoint)
    const worldNormal = new Matrix(
      new Matrix(
        Matrix.inverse(this.transform) as MatrixTypeFour
      ).transpose<MatrixTypeFour>()
    ).multiplyByTuple(localNormal)

    return new Vector(worldNormal.x, worldNormal.y, worldNormal.z).normalize()
  }
}
