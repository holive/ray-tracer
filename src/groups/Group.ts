import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { Point, Vector } from '../tuples'
import { BoundingBox } from '../bounds'

export class Group extends BaseShape {
  children: BaseShape[] = []
  name = ''
  currentBox?: BoundingBox

  constructor(firstChild?: BaseShape) {
    super()
    firstChild && this.addChild(firstChild)
  }

  addChild(shape: BaseShape): void {
    shape.parent = this
    this.children.push(shape)
  }

  localIntersect(ray: Ray): Intersection[] {
    const intersections: Intersection[] = []

    if (this.boundsOf().intersects(ray)) {
      this.children.forEach((child) => {
        if (!child || !child.intersect) return

        intersections.push(...child?.intersect(ray))
      })
    }

    return intersections
  }

  localNormalAt(_: Point): Vector {
    throw new Error("localNormalAt shouldn't be called in a Group")
  }

  boundsOf(): BoundingBox {
    if (this.currentBox) {
      return this.currentBox
    }
    const box = new BoundingBox()

    this.children.forEach((child) => {
      if (!child.parentSpaceBoundsOf) return
      box.addBox(child.parentSpaceBoundsOf())
    })

    this.currentBox = box

    return box
  }
}
