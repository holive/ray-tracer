import { Point } from '../tuples'

export class BoundingBox {
  min = new Point(Infinity, Infinity, Infinity)
  max = new Point(-Infinity, -Infinity, -Infinity)

  constructor(min?: Point, max?: Point) {
    this.min = min || this.min
    this.max = max || this.max
  }

  addPoint({ x, y, z }: Point): void {
    if (x < this.min.x) this.min.x = x
    if (y < this.min.y) this.min.y = y
    if (z < this.min.z) this.min.z = z

    if (x > this.max.x) this.max.x = x
    if (y > this.max.y) this.max.y = y
    if (z > this.max.z) this.max.z = z
  }

  addBox(box: BoundingBox): void {
    this.addPoint(box.min)
    this.addPoint(box.max)
  }

  containsPoint({ x, y, z }: Point): boolean {
    return (
      x >= this.min.x &&
      x <= this.max.x &&
      y >= this.min.y &&
      y <= this.max.y &&
      z >= this.min.z &&
      z <= this.max.z
    )
  }

  containsBox(box: BoundingBox): boolean {
    return this.containsPoint(box.min) && this.containsPoint(box.max)
  }
}
