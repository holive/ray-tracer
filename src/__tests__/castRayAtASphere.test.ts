import { Color, Point, Vector } from '../tuples'
import { Canvas } from '../canvas'
import { Sphere } from '../spheres'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { toFixed } from '../utils'
import { Material } from '../lights/Material'
import { PointLight } from '../lights/PointLight'

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
})
