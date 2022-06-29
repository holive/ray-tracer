import { Point, Vector } from '../tuples'

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
}
