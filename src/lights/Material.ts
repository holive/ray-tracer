import { BLACK, Color, Point, Vector } from '../tuples'
import { PointLight } from './PointLight'

export class Material {
  ambient = 0.1
  diffuse = 0.9
  specular = 0.9
  shininess = 200
  color = new Color(1, 1, 1)

  lighting(
    light: PointLight,
    position: Point,
    eyeV: Vector,
    normalV: Vector
  ): Color {
    const effectiveColor = this.color.multiplyByColor(light.intensity)

    const pos = light.position.subtract(position)
    const lightV = new Vector(pos.x, pos.y, pos.z).normalize()

    const ambient = effectiveColor.multiplyByScalar(this.ambient)

    // lightDotNormal represents the cosine of the angle between the light vector and the normal
    // vector. A negative number means the light is on the other side of the surface.
    const lightDotNormal = lightV.dot(normalV)
    let diffuse: Color
    let specular: Color

    if (lightDotNormal < 0) {
      diffuse = BLACK
      specular = BLACK
    } else {
      diffuse = effectiveColor
        .multiplyByScalar(this.diffuse)
        .multiplyByScalar(lightDotNormal)

      const lightNegative = lightV.negate()
      const reflectV = new Vector(
        lightNegative.x,
        lightNegative.y,
        lightNegative.z
      ).reflect(normalV)
      const reflectDotEye = reflectV.dot(eyeV)

      if (reflectDotEye <= 0) {
        specular = BLACK
      } else {
        const factor = Math.pow(reflectDotEye, this.shininess)
        specular = light.intensity
          .multiplyByScalar(this.specular)
          .multiplyByScalar(factor)
      }
    }

    return ambient.add(diffuse).add(specular)
  }
}
