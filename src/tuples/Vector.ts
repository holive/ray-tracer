import { Tuple } from './Tuple'
import { PointOrVector } from './types'
import { toFixed } from '../utils'
import { Point } from './Point'

export class Vector extends Tuple {
  constructor(x: number, y: number, z: number, w = PointOrVector.VECTOR) {
    super(x, y, z, w)
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
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
    return this.subtractV(normal.multiply(this.dot(normal) * 2))
  }

  toFixed(decimals?: number): Vector {
    return new Vector(
      toFixed(this.x, decimals),
      toFixed(this.y, decimals),
      toFixed(this.z, decimals)
    )
  }

  multiplyP(scalar: number): Point {
    return new Point(this.x * scalar, this.y * scalar, this.z * scalar)
  }

  subtractV(t: Tuple): Vector {
    return new Vector(this.x - t.x, this.y - t.y, this.z - t.z)
  }
}
