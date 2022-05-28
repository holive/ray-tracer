import { Tuple } from './Tuple'
import { PointOrVector } from './types'

export class Point extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, PointOrVector.POINT)
  }
}
