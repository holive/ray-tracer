import { PointLight } from '../lights'
import { Sphere } from '../spheres'
import { Ray } from '../rays'
import { Intersection } from '../intersections'

export class World {
  objects: Sphere[] = []
  light?: PointLight

  constructor(objects = [], light?: PointLight) {
    this.objects = objects
    this.light = light
  }

  intersect(r: Ray): Intersection[] {
    const intersections: Intersection[] = []

    this.objects.forEach(function intersectEachObjectInTheWorld(sphere) {
      intersections.push(...r.intersect(sphere))
    })

    return intersections.sort((a, b) => a.t - b.t)
  }
}
