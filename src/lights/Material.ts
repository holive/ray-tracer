import { BLACK, Color, Point, Vector } from '../tuples'
import { PointLight } from './PointLight'
import { BaseShape } from '../shapes'
import { FooPattern } from '../patterns/FooPattern'

export class Material {
  ambient = 0.1
  diffuse = 0.9
  specular = 0.9
  shininess = 200
  reflective = 0
  transparency = 0
  refractiveIndex = 1
  color = new Color(1, 1, 1)
  pattern?: FooPattern

  lighting(
    light: PointLight,
    position: Point,
    eyeV: Vector,
    normalV: Vector,
    inShadow = false,
    object: BaseShape
  ): Color {
    if (this.pattern) {
      this.color = this.pattern.patternAtShape(object, position)
    }

    const effectiveColor = this.color.multiplyByColor(light.intensity)
    const ambient = effectiveColor.multiplyByScalar(this.ambient)
    if (inShadow) {
      return ambient
    }

    const pos = light.position.subtract(position)
    const lightV = new Vector(pos.x, pos.y, pos.z, pos.w).normalize()

    const lightDotNormal = lightV.dot(normalV)
    let diffuse = BLACK
    let specular = BLACK

    if (lightDotNormal >= 0) {
      diffuse = effectiveColor
        .multiplyByScalar(this.diffuse)
        .multiplyByScalar(lightDotNormal)

      const { x, y, z, w } = lightV.negate()
      const reflectDotEye = new Vector(x, y, z, w).reflect(normalV).dot(eyeV)

      if (reflectDotEye <= 0) {
        specular = BLACK
      } else {
        specular = light.intensity
          .multiplyByScalar(this.specular)
          .multiplyByScalar(reflectDotEye ** this.shininess)
      }
    }

    return ambient.add(diffuse).add(specular)
  }
}
