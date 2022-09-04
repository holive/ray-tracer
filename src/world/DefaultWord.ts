import { World } from './World'
import { PointLight } from '../lights'
import { Color, Point } from '../tuples'
import { Sphere } from '../spheres'
import { Matrix } from '../matrices'

export class DefaultWord extends World {
  constructor(objects = [createS1(), createS2()], lights = createLights()) {
    super()
    this.lights = lights
    this.objects = objects
  }
}

function createS1() {
  const s1 = new Sphere()
  s1.material.color = new Color(0.8, 1.0, 0.6)
  s1.material.diffuse = 0.7
  s1.material.specular = 0.2
  return s1
}

function createS2() {
  const s2 = new Sphere()
  s2.setTransform(Matrix.scaling(0.5, 0.5, 0.5))
  return s2
}

function createLights() {
  return [new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1))]
}
