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
}
