import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'
import { Point, Vector } from '../tuples'

export class Cylinder extends BaseShape {
  localIntersect(r: Ray): Intersection[] {
    const a = r.direction.x ** 2 + r.direction.z ** 2

    if (Math.abs(a) < EPSILON) return []

    const b = 2 * r.origin.x * r.direction.x + 2 * r.origin.z * r.direction.z
    const c = r.origin.x ** 2 + r.origin.z ** 2 - 1
    const disc = b ** 2 - 4 * a * c

    if (disc < 0) return []

    const t0 = (-b - Math.sqrt(disc)) / (2 * a)
    const t1 = (-b + Math.sqrt(disc)) / (2 * a)

    return [new Intersection(t0, this), new Intersection(t1, this)]
  }

  localNormalAt({ x, z }: Point): Vector {
    return new Vector(x, 0, z)
  }
}
