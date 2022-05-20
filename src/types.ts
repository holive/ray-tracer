export enum PointOrVector {
  VECTOR,
  POINT
}

export type XYZ = {
  x: number
  y: number
  z: number
}

export type Point = XYZ & { w: PointOrVector.POINT }
export type Vector = XYZ & { w: PointOrVector.VECTOR }
export type Tuple = XYZ & { w: PointOrVector }

export type PointFactory = (x: number, y: number, z: number) => Point
export type VectorFactory = (x: number, y: number, z: number) => Vector
export type TupleFactory = (
  x: number,
  y: number,
  z: number,
  w: PointOrVector
) => Tuple
