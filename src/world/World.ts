import { PointLight } from '../lights'
import { Sphere } from '../spheres'

export class World {
  objects: Sphere[] = []
  light?: PointLight

  constructor(objects = [], light?: PointLight) {
    this.objects = objects
    this.light = light
  }
}
