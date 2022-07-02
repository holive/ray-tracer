import { Point, Vector } from '../tuples'
import { Ray } from '../Rays'
import { sq } from '../utils'

export class Sphere {
  id: string
  position = new Point(0, 0, 0)

  constructor(id: string) {
    this.id = id
  }

  intersects(ray: Ray): number[] {
    // the vector from the sphere's center, to the ray origin
    // remember: the sphere is centered at the world origin
    const { x, y, z } = ray.origin.subtract(this.position)
    const sphereToRay = new Vector(x, y, z)

    const a = ray.direction.dot(ray.direction)
    const b = 2 * ray.direction.dot(sphereToRay)
    const c = sphereToRay.dot(sphereToRay) - 1
    const discriminant = sq(b) - 4 * a * c

    if (discriminant < 0) {
      return []
    }

    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)
    return [t1, t2]
  }
}
