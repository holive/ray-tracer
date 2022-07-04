import { Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { sq } from '../utils'
import { Intersection } from '../intersections'
import { IDENTITY_MATRIX, Matrix, MatrixTypeFour } from '../matrices'

export class Sphere {
  id: string
  position = new Point(0, 0, 0)
  private transform: MatrixTypeFour = IDENTITY_MATRIX

  constructor(id: string) {
    this.id = id
  }

  intersect(ray: Ray): Intersection[] {
    const newRay = this.transformRay(ray)

    // the vector from the sphere's center, to the ray origin
    // remember: the sphere is centered at the world origin
    const { x, y, z } = newRay.origin.subtract(this.position)
    const sphereToRay = new Vector(x, y, z)

    const a = newRay.direction.dot(newRay.direction)
    const b = 2 * newRay.direction.dot(sphereToRay)
    const c = sphereToRay.dot(sphereToRay) - 1
    const discriminant = sq(b) - 4 * a * c

    if (discriminant < 0) {
      return []
    }

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
    return [new Intersection(t1, this), new Intersection(t2, this)]
  }

  getTransform(): MatrixTypeFour {
    return this.transform
  }

  setTransform(matrix: MatrixTypeFour): void {
    this.transform = matrix
  }

  private transformRay(ray: Ray): Ray {
    const matrix = Matrix.inverse(this.transform) as MatrixTypeFour
    if (!matrix || matrix.length != 4) {
      throw new Error('Cannot transform this ray.')
    }

    return ray.transform(new Matrix(matrix))
  }
}
