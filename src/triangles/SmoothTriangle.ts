import { Point, Vector } from '../tuples'
import { Triangle } from './Triangle'
import { Intersection } from '../intersections'

export class SmoothTriangle extends Triangle {
  n1: Vector
  n2: Vector
  n3: Vector

  constructor(
    p1: Point,
    p2: Point,
    p3: Point,
    n1: Vector,
    n2: Vector,
    n3: Vector
  ) {
    super(p1, p2, p3)
    this.n1 = n1
    this.n2 = n2
    this.n3 = n3
  }

  localNormalAt(point: Point, hit: Intersection): Vector {
    const u = hit.u || 1
    const v = hit.v || 1

    const a = this.n2.multiply(u)
    const b = this.n3.multiply(v)
    const c = this.n1.multiply(1 - u - v)

    const { x, y, z } = a.add(b).add(c)

    return new Vector(x, y, z)
  }
}
