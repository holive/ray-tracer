import { BaseShape } from '../shapes'
import { Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'
import { BoundingBox } from '../bounds'

export class Plane extends BaseShape {
  constructor() {
    super()
    this.box.min = new Point(-Infinity, 0, -Infinity)
    this.box.max = new Point(Infinity, 0, Infinity)
  }

  localNormalAt(_: Point): Vector {
    return new Vector(0, 1, 0)
  }

  localIntersect(ray: Ray): Intersection[] {
    if (Math.abs(ray.direction.y) < EPSILON) {
      return []
    }

    const t = -ray.origin.y / ray.direction.y
    return [new Intersection(t, this)]
  }

  boundsOf(): BoundingBox {
    return this.box
  }
}
