import {
  PointFactory,
  PointOrVector,
  Tuple,
  TupleFactory,
  Vector,
  VectorFactory
} from './types'
import { compareFloat, sq } from './utils'
import { InvalidTupleAddition } from './errors'

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

export const equalTuples = (a: Tuple, b: Tuple): boolean => {
  return (
    compareFloat(a.x, b.x) &&
    compareFloat(a.y, b.y) &&
    compareFloat(a.z, b.z) &&
    compareFloat(a.w, b.w)
  )
}

export const addTuples = (a: Tuple, b: Tuple): Tuple => {
  if (a.w === PointOrVector.POINT && b.w === PointOrVector.POINT) {
    throw new InvalidTupleAddition()
  }

  return tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w)
}

export const subtractTuples = (a: Tuple, b: Tuple): Tuple => {
  return tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w)
}

export const negateTuple = (t: Tuple): Tuple => ({
  x: -t.x,
  y: -t.y,
  z: -t.z,
  w: -t.w
})

export const multiplyTuples = (t: Tuple, scalar: number): Tuple => {
  return tuple(t.x * scalar, t.y * scalar, t.z * scalar, t.w * scalar)
}

export const magnitude = (v: Vector): number => {
  return Math.sqrt(sq(v.x) + sq(v.y) + sq(v.z) + sq(v.w))
}

export const normalize = (v: Vector): Vector => {
  const m = magnitude(v)
  return tuple(v.x / m, v.y / m, v.z / m, v.w / m) as Vector
}

export const dot = (a: Vector, b: Vector): number => {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w
}

export const cross = (a: Vector, b: Vector): Vector => {
  return vector(
    a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  )
}
