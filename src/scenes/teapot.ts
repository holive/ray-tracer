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

export {}
;(function teapotScene() {
  const camera = new Camera(100, 50, 1.152)
  camera.transform = viewTransform(
    new Point(-2.6, 1.5, -3.9),
    new Point(-0.6, 1, -0.8),
    new Vector(0, 1, 0)
  )

  const world = new World()
  world.lights = [new PointLight(new Point(-4.9, 4.9, -1), new Color(1, 1, 1))]

  const teapot = new ParseObjFile(
    path.join(__dirname, './teapot-low.obj')
  ).objToGroup()

  const checkeredFloor = new Plane()
  checkeredFloor.setTransform(Matrix.rotationY(0.31415))
  checkeredFloor.material.pattern = new CheckersPattern(
    new Color(0.35, 0.35, 0.35),
    new Color(0.65, 0.65, 0.65)
  )
  checkeredFloor.material.specular = 0
  checkeredFloor.material.reflective = 0.4

  world.objects.push(checkeredFloor, teapot)

  camera.render(world).toPPM()
})()
