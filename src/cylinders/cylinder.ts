import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'
import { Point, Vector } from '../tuples'

export class Cylinder extends BaseShape {
  minimum: number
  maximum: number

  constructor(min = -Infinity, max = Infinity) {
    super()
    this.minimum = min
    this.maximum = max
  }

  localIntersect(r: Ray): Intersection[] {
    const a = r.direction.x ** 2 + r.direction.z ** 2

    if (Math.abs(a) < EPSILON) return []

    const b = 2 * r.origin.x * r.direction.x + 2 * r.origin.z * r.direction.z
    const c = r.origin.x ** 2 + r.origin.z ** 2 - 1
    const disc = b ** 2 - 4 * a * c

    if (disc < 0) return []

    const t0 = (-b - Math.sqrt(disc)) / (2 * a)
    const t1 = (-b + Math.sqrt(disc)) / (2 * a)
    if (t0 > t1) return [new Intersection(t1, this), new Intersection(t0, this)]

    const xs = []
    const y0 = r.origin.y + t0 * r.direction.y
    if (this.minimum < y0 && y0 < this.maximum) {
      xs.push(new Intersection(t0, this))
    }

    const y1 = r.origin.y + t1 * r.direction.y
    if (this.minimum < y1 && y1 < this.maximum) {
      xs.push(new Intersection(t1, this))
    }

    return xs
  }

  localNormalAt({ x, z }: Point): Vector {
    return new Vector(x, 0, z)
  }
}
