import { Point, Vector } from '../tuples'

import { BaseShape } from '../shapes'
import { Intersection } from '../intersections'
import { Ray } from '../rays'

export class Sphere extends BaseShape {
  localNormalAt(p: Point): Vector {
    const { x, y, z } = p.subtract(this.position)
    return new Vector(x, y, z)
  }

  localIntersect(ray: Ray): Intersection[] {
    const { origin, direction } = ray

    // the vector from the sphere's center, to the ray origin
    const { x, y, z } = origin.subtract(this.position)
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
    return [new Intersection(t1, this), new Intersection(t2, this)]
  }
}
