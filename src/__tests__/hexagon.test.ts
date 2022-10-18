import { Sphere } from '../spheres'
import { Matrix } from '../matrices'
import { Cylinder } from '../cylinders/cylinder'
import { Group } from '../groups'
import { Camera } from '../camera'
import { viewTransform } from '../transformations'
import { Color, Point, Vector } from '../tuples'
import { World } from '../world'
import { PointLight } from '../lights'

describe('test group', () => {
  it.skip('renders the hexagon image', () => {
    const camera = new Camera(400, 400, 1.152)
    camera.transform = viewTransform(
      new Point(-1.6, 1.5, -1.9),
      new Point(-0.6, 0.5, -0.8),
      new Vector(0, 1, 0)
    )

    const world = new World()
    world.lights = [
      new PointLight(new Point(-4.9, 4.9, -1), new Color(1, 1, 1))
    ]

    world.objects.push(hexagon())

    camera.render(world).toPPM()
  })
})

function hexagon() {
  const hex = new Group()
  for (let i = 0; i <= 5; i++) {
    const side = hexagonSide()
    side.setTransform(Matrix.rotationY(i * (Math.PI / 3)))
    hex.addChild(side)
  }
  return hex
}

function hexagonCorner() {
  const corner = new Sphere()
  corner.setTransform(
    Matrix.translationC(0, 0, -1).multiply(Matrix.scaling(0.25, 0.25, 0.25))
  )
  return corner
}

function hexagonEdge() {
  const edge = new Cylinder()
  edge.minimum = 0
  edge.maximum = 1
  edge.setTransform(
    Matrix.translationC(0, 0, -1).multiply(
      Matrix.rotationYC(-Math.PI / 6).multiply(
        Matrix.rotationZC(-Math.PI / 2).multiply(Matrix.scaling(0.25, 1, 0.25))
      )
    )
  )
  return edge
}

function hexagonSide() {
  const side = new Group()
  side.addChild(hexagonCorner())
  side.addChild(hexagonEdge())
  return side
}
