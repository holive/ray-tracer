import { PointOrVector } from './types'
import { compareFloat } from '../utils'
import { InvalidTupleAddition } from '../errors'
import { Vector } from './Vector'
import { Point } from './Point'

export class Tuple {
  x: number
  y: number
  z: number
  w: PointOrVector

  constructor(x: number, y: number, z: number, w: PointOrVector) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  equal(t: Tuple): boolean {
    return (
      compareFloat(this.x, t.x) &&
      compareFloat(this.y, t.y) &&
      compareFloat(this.z, t.z) &&
      compareFloat(this.w, t.w)
    )
  }

  add(t: Tuple): Tuple {
    if (this.w === PointOrVector.POINT && t.w === PointOrVector.POINT) {
      throw new InvalidTupleAddition()
    }

    return new Tuple(this.x + t.x, this.y + t.y, this.z + t.z, this.w + t.w)
  }

  subtract(t: Tuple): Tuple {
    return new Tuple(this.x - t.x, this.y - t.y, this.z - t.z, this.w - t.w)
  }

  subtractV(t: Tuple): Vector {
    throw new Error('subtractV must be implemented in the subclass')
  }

  multiply(scalar: number): Tuple {
    return new Tuple(
      this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.w * scalar
    )
  }

  multiplyP(scalar: number): Point {
    throw new Error('subtractV must be implemented in the subclass')
  }

  negate(): Tuple {
    return new Tuple(-this.x, -this.y, -this.z, -this.w)
  }
}
