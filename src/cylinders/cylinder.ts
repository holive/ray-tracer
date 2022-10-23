import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection, IntersectionValueType } from '../intersections'
import { EPSILON } from '../utils'
import { Point, Vector } from '../tuples'
import { BoundingBox } from '../bounds'

export class Cylinder extends BaseShape {
  minimum: number
  maximum: number
  closed = false

  constructor(min = -Infinity, max = Infinity) {
    super()
    this.minimum = min
    this.maximum = max
    this.box.min = new Point(-1, min, -1)
    this.box.max = new Point(1, max, 1)
  }

  boundsOf(): BoundingBox {
    return this.box
  }

  localIntersect(r: Ray): Intersection[] {
    const a = r.direction.x ** 2 + r.direction.z ** 2

    let disc = 0
    let b = 0
    if (Math.abs(a) >= EPSILON) {
      b = 2 * r.origin.x * r.direction.x + 2 * r.origin.z * r.direction.z
      const c = r.origin.x ** 2 + r.origin.z ** 2 - 1
      disc = b ** 2 - 4 * a * c
      if (disc < 0) return []
    }

    const t0 = (-b - Math.sqrt(disc)) / (2 * a)
    const t1 = (-b + Math.sqrt(disc)) / (2 * a)
    if (t0 > t1) return [new Intersection(t1, this), new Intersection(t0, this)]

    const xs = this.intersectCaps(r, [])
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

  localNormalAt({ x, y, z }: Point): Vector {
    const dist = x ** 2 + z ** 2
    if (dist < 1 && y >= this.maximum - EPSILON) {
      return new Vector(0, 1, 0)
    } else if (dist < 1 && y <= this.minimum + EPSILON) {
      return new Vector(0, -1, 0)
    }

    return new Vector(x, 0, z)
  }

  intersectCaps(ray: Ray, xs: Intersection[]): Intersection[] {
    const newXs = [...xs]
    if (!this.closed || Math.abs(ray.direction.y) < EPSILON) return []

    let t = (this.minimum - ray.origin.y) / ray.direction.y
    if (this.checkCap(ray, t)) {
      newXs.push(new Intersection(t, this))
    }

    t = (this.maximum - ray.origin.y) / ray.direction.y
    if (this.checkCap(ray, t)) {
      newXs.push(new Intersection(t, this))
    }

    return newXs
  }

  private checkCap(ray: Ray, t: IntersectionValueType): boolean {
    const x = ray.origin.x + t * ray.direction.x
    const z = ray.origin.z + t * ray.direction.z
    return x ** 2 + z ** 2 <= 1
  }
}
