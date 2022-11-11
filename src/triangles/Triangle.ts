import { BaseShape } from '../shapes'
import { Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'
import { BoundingBox } from '../bounds'

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

    this.e1 = p2.subtractV(p1)
    this.e2 = p3.subtractV(p1)

    const { x, y, z } = this.e2.cross(this.e1)
    this.normal = new Vector(
      Object.is(x, -0) ? 0 : x,
      Object.is(y, -0) ? 0 : y,
      Object.is(z, -0) ? 0 : z
    ).normalize()
  }

  boundsOf(): BoundingBox {
    const box = new BoundingBox()
    box.addPoint(this.p1)
    box.addPoint(this.p2)
    box.addPoint(this.p3)
    return box
  }

  localNormalAt(point: Point, hit?: Intersection): Vector {
    return this.normal
  }

  localIntersect(ray: Ray): Intersection[] {
    const dirCrossE2 = ray.direction.cross(this.e2)
    const det = this.e1.dot(dirCrossE2)
    if (Math.abs(det) < EPSILON) return []

    const f = 1 / det
    const plToOrigin = ray.origin.subtractV(this.p1)
    const u = f * plToOrigin.dot(dirCrossE2)
    if (u < 0 || u > 1) return []

    const originCrossEl = plToOrigin.cross(this.e1)
    const v = f * ray.direction.dot(originCrossEl)
    if (v < 0 || u + v > 1) return []

    const t = f * this.e2.dot(originCrossEl)

    return [new Intersection(t, this, u, v)]
  }
}
