export enum PointOrVector {
  VECTOR,
  POINT
}

interface Coordinates {
  x: number
  y: number
  z: number
  w: PointOrVector
}

export interface TupleModel extends Coordinates {
  add: (t: TupleModel) => TupleModel
  subtract: (t: TupleModel) => TupleModel
  equal: (t: TupleModel) => boolean
  multiply: (scalar: number) => TupleModel
  negate: () => TupleModel
}

export interface VectorModel extends Coordinates {
  magnitude(): number
  normalize(): VectorModel
}

export type ColorType = {
  red: number
  green: number
  blue: number
}
