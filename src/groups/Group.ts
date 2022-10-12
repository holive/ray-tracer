import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Intersection } from '../intersections'

export class Group extends BaseShape {
  children: BaseShape[] = []

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
}
