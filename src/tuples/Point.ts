import { Tuple } from './Tuple'
import { PointOrVector } from './types'
import { Vector } from './Vector'

export class Point extends Tuple {
  constructor(x: number, y: number, z: number, w?: number) {
    super(x, y, z, w || PointOrVector.POINT)
  }

  subtractV(t: Tuple): Vector {
    return new Vector(this.x - t.x, this.y - t.y, this.z - t.z)
  }
}
