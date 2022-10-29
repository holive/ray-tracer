import { PointLight } from '../lights'
import { Ray } from '../rays'
import { Intersection, ComputationsType } from '../intersections'
import { BLACK, Color, Point, Vector } from '../tuples'
import { BaseShape } from '../shapes'

export class World {
  objects: BaseShape[] = []
  lights?: PointLight[] = []

  constructor(objects = [], light = []) {
    this.objects = objects
    this.lights = light
  }

  intersect(r: Ray): Intersection[] {
    const intersections: Intersection[] = []

    if (!this.objects?.length || !this.objects[0]) {
      throw new Error('The world objects are empty!')
    }

    this.objects.forEach(function intersectEachObjectInTheWorld(obj) {
      intersections.push(...obj.intersect(r))
    })

    return intersections.sort((a, b) => a.t - b.t)
  }

  shadeHit(comps: ComputationsType, remaining = 5): Color {
    if (!this.lights?.length || !this.lights[0]) {
      throw new Error('The world light cannot be empty!')
    }

    const { material } = comps.object
    const shadowed = this.isShadowed(comps.overPoint)
    const colors: Color[] = []

    this.lights?.forEach((light) => {
      const surface = material.lighting(
        light,
        comps.overPoint,
        comps.eyeV,
        comps.normalV,
        shadowed,
        comps.object
      )
      const reflected = this.reflectedColor(comps, remaining)
      const refractedColor = this.refractedColor(comps, remaining)

      if (material.reflective > 0 && material.transparency > 0) {
        const reflectance = Intersection.schlick(comps)
        colors.push(
          surface
            .add(reflected.multiplyByScalar(reflectance))
            .add(refractedColor.multiplyByScalar(1 - reflectance))
        )
      } else {
        colors.push(surface.add(reflected).add(refractedColor))
      }
    })

    if (colors.length >= 2) {
      return colors.reduce((prev, curr) => prev.add(curr), colors[0])
    }

    return colors[0]
  }

  colorAt(r: Ray, remaining = 5): Color {
    const xs = this.intersect(r)
    const hit = Intersection.hit(xs)
    if (!hit) {
      return BLACK
    }

    return this.shadeHit(hit.prepareComputations(r, xs), remaining)
  }

  isShadowed(point: Point): boolean {
    if (!this.lights?.length) {
      console.log('Hey: world initialized without lights.')
      return true
    }

    const { x, y, z } = this.lights[0].position.subtract(point)
    const v = new Vector(x, y, z)
    const distance = v.magnitude()
    const direction = v.normalize()

    const intersections = this.intersect(new Ray(point, direction))

    const h = Intersection.hit(intersections)
    return h != null && h.t < distance
  }

  reflectedColor(comps: ComputationsType, remaining: number): Color {
    if (comps.object.material.reflective == 0 || remaining < 1) {
      return new Color(0, 0, 0)
    }

    const reflectRay = new Ray(comps.overPoint, comps.reflectV)
    const color = this.colorAt(reflectRay, remaining - 1)
    return color.multiplyByScalar(comps.object.material.reflective)
  }

  refractedColor(comps: ComputationsType, remaining: number): Color {
    const nRatio = comps.n1 / comps.n2
    const cosI = comps.eyeV.dot(comps.normalV)
    const sin2T = nRatio ** 2 * (1 - cosI ** 2)

    if (
      comps.object.material.transparency == 0 ||
      remaining == 0 ||
      sin2T > 1
    ) {
      return new Color(0, 0, 0)
    }

    const cosT = Math.sqrt(1 - sin2T)
    const direction = comps.normalV
      .multiply(nRatio * cosI - cosT)
      .subtract(comps.eyeV.multiply(nRatio))

    const refractedRay = new Ray(
      comps.underPoint,
      new Vector(direction.x, direction.y, direction.z)
    )

    return this.colorAt(refractedRay, remaining - 1).multiplyByScalar(
      comps.object.material.transparency
    )
  }
}
