import { Point, Vector } from '../tuples'
import { Matrix, MatrixTypeFour } from '../matrices'
import { Intersection } from '../intersections'
import { Sphere } from '../spheres'

export class Ray {
  origin: Point
  direction: Vector

  constructor(origin: Point, direction: Vector) {
    this.origin = origin
    this.direction = direction
  }

  intersect(sphere: Sphere): Intersection[] {
    const { origin, direction } = this.transform(
      new Matrix(Matrix.inverse(sphere.getTransform()) as MatrixTypeFour)
    )

    // the vector from the sphere's center, to the ray origin
    const { x, y, z } = origin.subtract(sphere.position)
    const sphereToRay = new Vector(x, y, z)

    const a = direction.dot(direction)
    const b = 2 * direction.dot(sphereToRay)
    const c = sphereToRay.dot(sphereToRay) - 1
    const discriminant = b * b - 4 * a * c

    if (discriminant < 0) {
      return []
    }

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
    return [new Intersection(t1, sphere), new Intersection(t2, sphere)]
  }

  position(time: number): Point {
    return this.direction.multiply(time).add(this.origin)
  }

  transform(matrix: Matrix): Ray {
    const origin = matrix.multiplyByTuple(this.origin)
    const direction = matrix.multiplyByTuple(this.direction)
    return new Ray(origin, new Vector(direction.x, direction.y, direction.z))
  }
}
