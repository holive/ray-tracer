import { Sphere } from '../spheres'
import { Point, Tuple, Vector } from '../tuples'

export type ComputationsType = {
  t: IntersectionValueType
  object: IntersectionObjectType
  point: Point
  eyeV: Vector
  normalV: Vector
  inside: boolean
  overPoint: Tuple
}

export type IntersectionObjectType = Sphere
export type IntersectionValueType = number
