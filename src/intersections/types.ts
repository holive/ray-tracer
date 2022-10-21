import { Point, Tuple, Vector } from '../tuples'
import { BaseShape } from '../shapes'

export type ComputationsType = {
  t: IntersectionValueType
  object: IntersectionObjectType
  point: Point
  eyeV: Vector
  normalV: Vector
  inside: boolean
  overPoint: Tuple
  underPoint: Tuple
  reflectV: Vector
  n1: number
  n2: number
}

export type IntersectionObjectType = BaseShape
export type IntersectionValueType = number
