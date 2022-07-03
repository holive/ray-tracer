import { Sphere } from '../spheres'

type IntersectionObjectType = Sphere
type IntersectionValueType = number

export class Intersection {
  // t value of the intersection
  t: IntersectionValueType
  object: IntersectionObjectType

  constructor(t: IntersectionValueType, object: IntersectionObjectType) {
    this.t = t
    this.object = object
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
