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
    return new Ray(
      matrix.multiplyByTupleP(this.origin),
      matrix.multiplyByTupleV(this.direction)
    )
  }
}
