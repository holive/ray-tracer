import { Tuple } from './Tuple'
import { PointOrVector, VectorModel } from './types'
import { sq } from '../utils'

export class Vector extends Tuple implements VectorModel {
  constructor(x: number, y: number, z: number, w = PointOrVector.VECTOR) {
    super(x, y, z, w)
  }

  magnitude(): number {
    return Math.sqrt(sq(this.x) + sq(this.y) + sq(this.z) + sq(this.w))
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
}
