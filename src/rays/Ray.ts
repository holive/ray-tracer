import { Point, Vector } from '../tuples'
import { Matrix } from '../matrices'

export class Ray {
  origin: Point
  direction: Vector

  constructor(origin: Point, direction: Vector) {
    this.origin = origin
    this.direction = direction
  }

  position(time: number): Point {
    return this.direction.multiply(time).add(this.origin)
  }

  transform(matrix: Matrix): Ray {
    const origin = matrix.multiplyByTuple(this.origin)
    const direction = matrix.multiplyByTuple(this.direction)
    return new Ray(origin, new Vector(direction.x, direction.y, direction.z))
  }
}
