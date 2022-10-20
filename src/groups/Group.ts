import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { Point, Vector } from '../tuples'

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
    const intersections: Intersection[] = []

    this.children.forEach((child) => {
      intersections.push(...child.intersect(ray))
    })

    return intersections.sort((a, b) => a.t - b.t)
  }

  localNormalAt(_: Point): Vector {
    throw new Error("localNormalAt shouldn't be called in a Group")
  }
}
