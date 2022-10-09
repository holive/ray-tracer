import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection, IntersectionValueType } from '../intersections'
import { EPSILON } from '../utils'
import { Point, Vector } from '../tuples'

export class Cone extends BaseShape {
  minimum: number
  maximum: number
  closed = false

  constructor(min = -Infinity, max = Infinity) {
    super()
    this.minimum = min
    this.maximum = max
  }

  localIntersect(r: Ray): Intersection[] {
    const xs = this.intersectCaps(r, [])

    const a = r.direction.x ** 2 - r.direction.y ** 2 + r.direction.z ** 2
    const b =
      2 * r.origin.x * r.direction.x -
      2 * r.origin.y * r.direction.y +
      2 * r.origin.z * r.direction.z
    const c = r.origin.x ** 2 - r.origin.y ** 2 + r.origin.z ** 2

    if (Math.abs(a) < EPSILON) {
      if (Math.abs(b) < EPSILON) {
        return xs
      }

      const t = -c / (b * 2)
      xs.push(new Intersection(t, this))
      return xs
    } else {
      const disc = b ** 2 - 4 * a * c

      // ray does not intersect cone itself
      if (disc < 0) return xs

      let t0 = (-b - Math.sqrt(disc)) / (2 * a)
      let t1 = (-b + Math.sqrt(disc)) / (2 * a)

      if (t0 > t1) {
        ;[t0, t1] = [t1, t0]
      }

      const y0 = r.origin.y + t0 * r.direction.y
      if (this.minimum < y0 && y0 < this.maximum) {
        xs.push(new Intersection(t0, this))
      }

      const y1 = r.origin.y + t1 * r.direction.y
      if (this.minimum < y1 && y1 < this.maximum) {
        xs.push(new Intersection(t1, this))
      }
    }

    return xs
  }

  intersectCaps(ray: Ray, xs: Intersection[]): Intersection[] {
    const newXs = [...xs]
    if (!this.closed || Math.abs(ray.direction.y) < EPSILON) return []

    let t = (this.minimum - ray.origin.y) / ray.direction.y
    if (this.checkCap(ray, t, this.minimum)) {
      newXs.push(new Intersection(t, this))
    }

    t = (this.maximum - ray.origin.y) / ray.direction.y
    if (this.checkCap(ray, t, this.maximum)) {
      newXs.push(new Intersection(t, this))
    }

    return newXs
  }

  localNormalAt(p: Point): Vector {
    const dist = p.x ** 2 + p.z ** 2

    if (dist < 1 && p.y >= this.maximum - EPSILON) {
      return new Vector(0, 1, 0)
    } else if (dist < 1 && p.y <= this.minimum + EPSILON) {
      return new Vector(0, -1, 0)
    }

    let y = Math.sqrt(p.x ** 2 + p.z ** 2)
    y = p.y > 0 ? -y : y

    return new Vector(p.x, y, p.z) // todo: check this one
  }

  private checkCap(
    ray: Ray,
    t: IntersectionValueType,
    radius: number
  ): boolean {
    const x = ray.origin.x + t * ray.direction.x
    const z = ray.origin.z + t * ray.direction.z
    return x ** 2 + z ** 2 <= radius ** 2
  }
}
