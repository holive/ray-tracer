import { Ray } from '../rays'
import {
  ComputationsType,
  IntersectionObjectType,
  IntersectionValueType
} from './types'
import { Vector } from '../tuples'

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
    const normalV = object.normalAt(point)
    const eyeV = this.negateDirection(r.direction)

    return {
      t,
      eyeV,
      point,
      object,
      normalV
    }
  }

  private negateDirection(value: Vector): Vector {
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
