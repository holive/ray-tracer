import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'
import { Point, Vector } from '../tuples'
import { BoundingBox } from '../bounds'

export class Cube extends BaseShape {
  constructor() {
    super()
    this.box.min = new Point(-1, -1, -1)
    this.box.max = new Point(1, 1, 1)
  }

  boundsOf(): BoundingBox {
    return this.box
  }

  localIntersect(r: Ray): Intersection[] {
    const [xtMin, xtMax] = this.checkAxis(r.origin.x, r.direction.x)
    const [ytMin, ytMax] = this.checkAxis(r.origin.y, r.direction.y)
    const [ztMin, ztMax] = this.checkAxis(r.origin.z, r.direction.z)

    const tMin = Math.max(xtMin, ytMin, ztMin)
    const tMax = Math.min(xtMax, ytMax, ztMax)

    if (tMin > tMax) return []

    return Intersection.intersections(
      new Intersection(tMin, this),
      new Intersection(tMax, this)
    )
  }

  checkAxis(origin: number, direction: number): [number, number] {
    const tMinNumerator = -1 - origin
    const tMaxNumerator = 1 - origin
    let tMin
    let tMax

    if (Math.abs(direction) >= EPSILON) {
      tMin = tMinNumerator / direction
      tMax = tMaxNumerator / direction
    } else {
      tMin = tMinNumerator * Number.POSITIVE_INFINITY
      tMax = tMaxNumerator * Number.POSITIVE_INFINITY
    }

    if (tMin > tMax) {
      return [tMax, tMin]
    }

    return [tMin, tMax]
  }

  localNormalAt(point: Point): Vector {
    const maxc = Math.max(
      Math.abs(point.x),
      Math.abs(point.y),
      Math.abs(point.z)
    )

    if (maxc == Math.abs(point.x)) {
      return new Vector(point.x, 0, 0)
    } else if (maxc == Math.abs(point.y)) {
      return new Vector(0, point.y, 0)
    }

    return new Vector(0, 0, point.z)
  }
}
