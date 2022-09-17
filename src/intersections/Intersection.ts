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

  prepareComputations(r: Ray, xs?: Intersection[]): ComputationsType {
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
    const underPoint = point.subtract(normalV.multiply(EPSILON))
    const reflectV = r.direction.reflect(normalV)

    const { n1, n2 } = this.calculateN1N2(xs || [])

    return {
      t,
      eyeV,
      point,
      object,
      normalV,
      inside,
      overPoint,
      underPoint,
      reflectV,
      n1,
      n2
    }
  }

  private calculateN1N2(xs: Intersection[]) {
    let n1 = NaN
    let n2 = NaN
    let containers: IntersectionObjectType[] = []

    for (const intersection of xs) {
      if (this === intersection) {
        n1 = containers.length
          ? containers[containers.length - 1].material.refractiveIndex
          : 1
      }

      const filtered = []
      containers = containers.filter((container) => {
        if (container !== intersection.object) return true
        filtered.push(container)
      })
      if (filtered.length == 0) containers.push(intersection.object)

      if (this === intersection) {
        n2 = containers.length
          ? containers[containers.length - 1].material.refractiveIndex
          : 1
        break
      }
    }

    return { n1, n2 }
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

  static schlick(comps: ComputationsType): 0 | 1 {
    const cos = comps.eyeV.dot(comps.normalV)

    if (comps.n1 > comps.n2) {
      const n = comps.n1 / comps.n2
      const sin2T = n ** 2 * (1 - cos ** 2)
      if (sin2T > 1) return 1
    }

    return 0
  }
}
