import {
  PointFactory,
  PointOrVector,
  TupleFactory,
  VectorFactory
} from './types'

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
