import { Tuple } from './Tuple'
import { PointOrVector } from './types'
import { pow2, toFixed } from '../utils'

export class Vector extends Tuple {
  constructor(x: number, y: number, z: number, w = PointOrVector.VECTOR) {
    super(x, y, z, w)
  }

  magnitude(): number {
    return Math.sqrt(pow2(this.x) + pow2(this.y) + pow2(this.z) + pow2(this.w))
  }

  normalize(): Vector {
    const m = this.magnitude()
    return new Vector(this.x / m, this.y / m, this.z / m, this.w / m)
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
  }

  cross(v: Vector): Vector {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }

  reflect(normal: Vector): Vector {
    const res = this.subtract(normal.multiply(this.dot(normal) * 2))
    return new Vector(res.x, res.y, res.z)
  }

  toFixed(decimals?: number): Vector {
    return new Vector(
      toFixed(this.x, decimals),
      toFixed(this.y, decimals),
      toFixed(this.z, decimals)
    )
  }
}
