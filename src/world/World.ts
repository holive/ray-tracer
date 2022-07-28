import { PointLight } from '../lights'
import { Sphere } from '../spheres'
import { Ray } from '../rays'
import { Intersection, ComputationsType } from '../intersections'
import { BLACK, Color } from '../tuples'

export class World {
  objects: Sphere[] = []
  lights?: PointLight[]

  constructor(objects = [], light?: PointLight[]) {
    this.objects = objects
    this.lights = light
  }

  intersect(r: Ray): Intersection[] {
    const intersections: Intersection[] = []

    if (!this.objects?.length || !this.objects[0]) {
      throw new Error('The world objects are empty!')
    }

    this.objects.forEach(function intersectEachObjectInTheWorld(sphere) {
      intersections.push(...r.intersect(sphere))
    })

    return intersections.sort((a, b) => a.t - b.t)
  }

  shadeHit(comps: ComputationsType): Color {
    const colors: Color[] = []

    if (!this.lights?.length || !this.lights[0]) {
      throw new Error('The world light cannot be empty!')
    }

    this.lights?.forEach((light) => {
      colors.push(
        comps.object.material.lighting(
          light,
          comps.point,
          comps.eyeV,
          comps.normalV
        )
      )
    })

    if (colors.length >= 2) {
      return colors.reduce((prev, curr) => prev.add(curr), colors[0])
    }

    return colors[0]
  }

  colorAt(r: Ray): Color {
    const hit = Intersection.hit(this.intersect(r))
    if (!hit) {
      return BLACK
    }

    return this.shadeHit(hit.prepareComputations(r))
  }
}
