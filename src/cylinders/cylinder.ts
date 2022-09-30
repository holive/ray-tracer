import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'

export class Cylinder extends BaseShape {
  localIntersect(r: Ray): Intersection[] {
    const a = r.direction.x ** 2 + r.direction.z ** 2

    if (Math.round(a / 1000) * 1000 == 0) return []

    const b = 2 * r.origin.x * r.direction.x + 2 * r.origin.z * r.direction.z
    const c = r.origin.x ** 2 + r.origin.z ** 2 - 1
    const disc = b ** 2 - 4 * a * c

    if (disc < 0) return []

    return [new Intersection(1, this)]
  }
}
