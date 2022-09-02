import { Ray } from '../rays'
import {
  ComputationsType,
  IntersectionObjectType,
  IntersectionValueType
} from './types'
import { Vector } from '../tuples'
import { EPSILON } from '../utils'

export class Intersection {
  t: IntersectionValueType
  object: IntersectionObjectType

  constructor(t: IntersectionValueType, object: IntersectionObjectType) {
    this.t = t
    this.object = object
  }

  prepareComputations(r: Ray): ComputationsType {
    const t = this.t
    const object = this.object
    const point = r.position(t)
    const eyeV = this.negateVector(r.direction)
    let normalV = object.normalAt(point)
    let inside = false

    if (normalV.dot(eyeV) < 0) {
      inside = true
      normalV = this.negateVector(normalV)
    }

    const overPoint = point.add(normalV.multiply(EPSILON))
    const reflectV = r.direction.reflect(normalV)

    return {
      t,
      eyeV,
      point,
      object,
      normalV,
      inside,
      overPoint,
      reflectV
    }
  }

  private negateVector(value: Vector): Vector {
    const n = (v: number) => (v != 0 ? -v : v)
    return new Vector(n(value.x), n(value.y), n(value.z))
  }

  static intersections(...args: Intersection[]): Intersection[] {
    return args
  }

  static hit(intersections: Intersection[]): Intersection | null {
    function removeNegativeResults(item: Intersection) {
      return item.t >= 0
    }

    const hits = [...intersections]
      .sort((a, b) => a.t - b.t)
      .filter(removeNegativeResults)

    return hits.length ? hits[0] : null
  }
}
