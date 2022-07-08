import { Color, Point, Vector } from '../tuples'
import { Canvas } from '../canvas'
import { Sphere } from '../spheres'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { toFixed } from '../utils'

describe('Cast rays at a sphere and draw the picture to a canvas', () => {
  it('goes and writes in the ppm', () => {
    const rayOrigin = new Point(0, 0, -5)
    const wallZ = 10
    const wallSize = 7.0
    const canvasPixels = 100

    const pixelSize = wallSize / canvasPixels
    const half = wallSize / 2

    const canvas = new Canvas(canvasPixels, canvasPixels)
    const color = new Color(1, 0, 0)
    const shape = new Sphere()

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

        const xs = r.intersect(shape)
        if (Intersection.hit(xs)) {
          canvas.writePixel(x, y, color)
        }
      }
    }

    canvas.toPPM()
  })
})
