import {
  PointFactory,
  PointOrVector,
  Tuple,
  TupleFactory,
  VectorFactory
} from './types'
import { compareFloat } from './utils'

export const tuple: TupleFactory = (x, y, z, w) => ({
  x,
  y,
  z,
  w
})

export const point: PointFactory = (x, y, z) => ({
  x,
  y,
  z,
  w: PointOrVector.POINT
})

export const vector: VectorFactory = (x, y, z) => ({
  x,
  y,
  z,
  w: PointOrVector.VECTOR
})

export const equalTuples = (a: Tuple, b: Tuple): boolean =>
  compareFloat(a.x, b.x) &&
  compareFloat(a.y, b.y) &&
  compareFloat(a.z, b.z) &&
  compareFloat(a.w, b.w)
