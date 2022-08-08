import { Color, Point, Vector } from '../tuples'
import { Canvas } from '../canvas'
import { Sphere } from '../spheres'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { toFixed } from '../utils'
import { Material, PointLight } from '../lights'
import { Matrix } from '../matrices'
import { World } from '../world'
import { Camera } from '../camera'
import { viewTransform } from '../transformations'

describe('Cast rays at a sphere and draw the picture to a canvas', () => {
  it('goes and writes in the ppm', () => {
    const rayOrigin = new Point(0, 0, -5)
    const wallZ = 10
    const wallSize = 7.0
    const canvasPixels = 600

    const pixelSize = wallSize / canvasPixels
    const half = wallSize / 2

    const canvas = new Canvas(canvasPixels, canvasPixels)
    const sphere = new Sphere()
    sphere.material = new Material()
    sphere.material.color = new Color(1, 0.2, 1)

    const lightPosition = new Point(-10, 10, -10)
    const lightColor = new Color(1, 1, 1)
    const light = new PointLight(lightPosition, lightColor)

    for (let y = 0; y < canvasPixels; y++) {
      const worldY = toFixed(half - pixelSize * y)

      for (let x = 0; x < canvasPixels; x++) {
        const worldX = toFixed(-half + pixelSize * x)
        const position = new Point(worldX, worldY, wallZ)

        const rayVector = position.subtract(rayOrigin)
        const r = new Ray(
          rayOrigin,
          new Vector(rayVector.x, rayVector.y, rayVector.z).normalize()
        )

        const xs = r.intersect(sphere)
        const intersection = Intersection.hit(xs)
        if (intersection) {
          const point = r.position(intersection.t)
          const normal = intersection.object.normalAt(point)
          const eye = r.direction.negate()
          const color = intersection.object.material.lighting(
            light,
            point,
            new Vector(eye.x, eye.y, eye.z),
            normal
          )

          canvas.writePixel(x, y, color)
        }
      }
    }

    canvas.toPPM()
  })

  it('draws the first scene', () => {
    const middle = new Sphere()
    middle.setTransform(Matrix.translation(-0.5, 1, 0.5))
    middle.material = new Material()
    middle.material.color = new Color(0.1, 1, 0.5)
    middle.material.diffuse = 0.7
    middle.material.specular = 0.3

    const right = new Sphere()
    right.setTransform(
      new Matrix(Matrix.translation(1.5, 0.5, -0.5)).multiply(
        Matrix.scaling(0.5, 0.5, 0.5)
      )
    )
    right.material = new Material()
    right.material.color = new Color(0.5, 1, 0.1)
    right.material.diffuse = 0.7
    right.material.specular = 0.3

    const left = new Sphere()
    left.setTransform(
      new Matrix(Matrix.translation(-1.5, 0.33, -0.75)).multiply(
        Matrix.scaling(0.33, 0.33, 0.33)
      )
    )
    left.material = new Material()
    left.material.color = new Color(1, 0.8, 0.1)
    left.material.diffuse = 0.7
    left.material.specular = 0.3

    const { leftWall, rightWall, floor } = buildWalls()
    const world = new World()
    world.lights = [new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1))]
    world.objects = [floor, leftWall, rightWall, middle, left, right]

    const camera = new Camera(600, 300, Math.PI / 3)
    camera.transform = viewTransform(
      new Point(0, 1.5, -5),
      new Point(0, 1, 0),
      new Vector(0, 1, 0)
    )
    camera.render(world).toPPM()
  })
})

function buildWalls() {
  const floor = new Sphere()
  floor.setTransform(Matrix.scaling(10, 0.001, 10))
  floor.material = new Material()
  floor.material.color = new Color(1, 0.9, 0.9)
  floor.material.specular = 0

  const leftWall = new Sphere()
  leftWall.setTransform(
    new Matrix(
      new Matrix(
        new Matrix(Matrix.translation(0, 0, 5)).multiply(
          Matrix.rotationY(-Math.PI / 4)
        )
      ).multiply(Matrix.rotationX(Math.PI / 2))
    ).multiply(Matrix.scaling(10, 0.01, 10))
  )
  leftWall.material = floor.material

  const rightWall = new Sphere()
  rightWall.setTransform(
    new Matrix(
      new Matrix(
        new Matrix(Matrix.translation(0, 0, 5)).multiply(
          Matrix.rotationY(Math.PI / 4)
        )
      ).multiply(Matrix.rotationX(Math.PI / 2))
    ).multiply(Matrix.scaling(10, 0.01, 10))
  )
  rightWall.material = floor.material

  return { floor, leftWall, rightWall }
}
