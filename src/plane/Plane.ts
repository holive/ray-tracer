import { TestShape } from '../shapes'
import { Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { EPSILON } from '../utils'

export class Plane extends TestShape {
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
}
