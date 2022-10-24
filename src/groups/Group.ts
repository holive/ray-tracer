import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { Point, Vector } from '../tuples'
import { BoundingBox } from '../bounds'

export class Group extends BaseShape {
  children: BaseShape[] = []
  name = ''

  constructor(firstChild?: BaseShape) {
    super()
    firstChild && this.addChild(firstChild)
  }

  addChild(shape: BaseShape): void {
    shape.parent = this
    this.children.push(shape)
  }

  localIntersect(ray: Ray): Intersection[] {
    if (this.boundsOf().intersects(ray)) {
      const intersections: Intersection[] = []

      this.children.forEach((child) => {
        if (!child || !child.intersect) return
        intersections.push(...child?.intersect(ray))
      })

      return intersections.sort((a, b) => a.t - b.t)
    }

    return []
  }

  localNormalAt(_: Point): Vector {
    throw new Error("localNormalAt shouldn't be called in a Group")
  }

  boundsOf(): BoundingBox {
    const box = new BoundingBox()

    this.children.forEach((child) => {
      const cbo = child.parentSpaceBoundsOf()
      box.addBox(cbo)
    })

    return box
  }
}
