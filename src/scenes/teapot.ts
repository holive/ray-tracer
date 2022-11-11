import { Camera } from '../camera'
import { viewTransform } from '../transformations'
import { Color, Point, Vector } from '../tuples'

import { World } from '../world'
import { PointLight } from '../lights'
import { ParseObjFile } from '../objectFile'
import * as path from 'path'
import { Plane } from '../plane'
import { Matrix } from '../matrices'
import { CheckersPattern } from '../patterns/CheckersPattern'
import { degreesToRadians } from '../utils'
import { Sphere } from '../spheres'

export function teapotScene() {
  const camera = new Camera(300, 480, 1.152)
  camera.transform = viewTransform(
    new Point(-2.6, 1.5, -3.9),
    new Point(3, -1.5, 4),
    new Vector(0, 1, 0)
  )

  const world = new World()
  world.lights = [new PointLight(new Point(-7, 4.9, -5), new Color(1, 1, 1))]

  const pattern = new CheckersPattern(
    new Color(0.35, 0.35, 0.35),
    new Color(0.65, 0.65, 0.65)
  )
  pattern.setPatternTransform(Matrix.scaling(1.5, 1.5, 1.5))
  const checkeredFloor = new Plane()
  checkeredFloor.setTransform(Matrix.translation(0, -3, 0))
  checkeredFloor.material.pattern = pattern

  const wall = new Plane()
  wall.setTransform(
    Matrix.rotationXC(-degreesToRadians(90)).multiply(
      Matrix.translation(0, -13, 0)
    )
  )
  wall.material.pattern = pattern

  const wall2 = new Plane()
  wall2.setTransform(
    Matrix.rotationXC(-degreesToRadians(270)).multiply(
      Matrix.translation(0, -13, 0)
    )
  )
  wall2.material.pattern = pattern

  const suzanne = new ParseObjFile(
    path.join(__dirname, './suzanne.obj')
  ).objToGroup()
  suzanne.setTransform(Matrix.scaling(1.8, 1.8, 1.8))

  // const sphere = new Sphere()
  // sphere.material
  // sphere.material.color = new Color(0.1, 0.5, 0.9)
  // sphere.material.reflective = 0.1
  // sphere.material.shininess = 50
  // sphere.material.specular = 0.2
  // sphere.material.diffuse = 0.95
  // sphere.setTransform(Matrix.scaling(1.8, 1.8, 1.8))

  world.objects.push(suzanne, checkeredFloor, wall, wall2)
  camera.render(world).toPPM()
}

teapotScene()
