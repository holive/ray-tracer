import { BaseShape } from '../shapes'
import { Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'

export class Triangle extends BaseShape {
  p1: Point
  p2: Point
  p3: Point
  e1: Vector
  e2: Vector
  normal: Vector

  constructor(p1: Point, p2: Point, p3: Point) {
    super()
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3

    const e1 = p2.subtract(p1)
    this.e1 = new Vector(e1.x, e1.y, e1.z)

    const e2 = p3.subtract(p1)
    this.e2 = new Vector(e2.x, e2.y, e2.z)

    const { x, y, z } = this.e2.cross(this.e1)
    this.normal = new Vector(
      this.zero(x),
      this.zero(y),
      this.zero(z)
    ).normalize()
  }

  private zero(value: number): number {
    return Object.is(value, -0) ? 0 : value
  }

  localNormalAt(point: Point, hit: Intersection): Vector {
    return this.normal
  }

  localIntersect(ray: Ray): Intersection[] {
    const dirCrossE2 = ray.direction.cross(this.e2)
    const det = this.e1.dot(dirCrossE2)
    if (Math.abs(det) < EPSILON) return []

    const f = 1.0 / det
    const plToOrigin = ray.origin.subtract(this.p1)
    const u =
      f *
      new Vector(plToOrigin.x, plToOrigin.y, plToOrigin.z).dot(
        new Vector(dirCrossE2.x, dirCrossE2.y, dirCrossE2.z)
      )
    if (u < 0 || u > 1) return []

    const originCrossEl = new Vector(
      plToOrigin.x,
      plToOrigin.y,
      plToOrigin.z
    ).cross(this.e1)
    const v = f * ray.direction.dot(originCrossEl)
    if (v < 0 || u + v > 1) return []

    const t = f * this.e2.dot(originCrossEl)
    return [new Intersection(t, this, u, v)]
  }
}
