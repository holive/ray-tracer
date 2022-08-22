import { Color, Point, Vector } from '../tuples'
import { Material, PointLight } from '../lights'
import { StripePattern } from '../patterns/StripePattern'

describe('Materials', () => {
  it('should have a default material', () => {
    const m = new Material()
    expect(m.color).toEqual(new Color(1, 1, 1))
    expect(m.ambient).toEqual(0.1)
    expect(m.diffuse).toEqual(0.9)
    expect(m.specular).toEqual(0.9)
    expect(m.shininess).toEqual(200.0)
  })

  describe('Lighting', () => {
    const m = new Material()
    const position = new Point(0, 0, 0)

    it('should check the Lighting with the eye between the light and the surface', () => {
      const eyeV = new Vector(0, 0, -1)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1))
      const result = m.lighting(light, position, eyeV, normalV)
      expect(result).toEqual(new Color(1.9, 1.9, 1.9))
    })

    it('should check the Lighting with the eye between the light and the surface, eye offset 45 deg', () => {
      const eyeV = new Vector(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1))
      const result = m.lighting(light, position, eyeV, normalV)
      expect(result).toEqual(new Color(1.0, 1.0, 1.0))
    })

    it('should check the Lighting with the eye opposite surface, light offset 45 deg', () => {
      const eyeV = new Vector(0, 0, -1)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1))
      const result = m.lighting(light, position, eyeV, normalV)
      expect(result).toEqual(
        new Color(0.7363961030678927, 0.7363961030678927, 0.7363961030678927)
      )
    })

    it('should check the Lighting with the eye in the path of the reflection vector', () => {
      const eyeV = new Vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1))
      const result = m.lighting(light, position, eyeV, normalV)
      expect(result).toEqual(
        new Color(1.6363961030678928, 1.6363961030678928, 1.6363961030678928)
      )
    })

    it('should check the Lighting with the light behind the surface', () => {
      const eyeV = new Vector(0, 0, -1)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 0, 10), new Color(1, 1, 1))
      const result = m.lighting(light, position, eyeV, normalV)
      expect(result).toEqual(new Color(0.1, 0.1, 0.1))
    })

    it('should check lighting with the serface in shadow', () => {
      const eyeV = new Vector(0, 0, -1)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1))
      const inShadow = true
      const result = m.lighting(light, position, eyeV, normalV, inShadow)
      expect(result).toEqual(new Color(0.1, 0.1, 0.1))
    })
  })

  describe('Patterns', () => {
    it('should check lighting with a pattern applied', () => {
      const m = new Material()
      m.pattern = new StripePattern(new Color(1, 1, 1), new Color(0, 0, 0))
      m.ambient = 1
      m.diffuse = 0
      m.specular = 0
      const eyeV = new Vector(0, 0, -1)
      const normalV = new Vector(0, 0, -1)
      const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1))
      const c1 = m.lighting(light, new Point(0.9, 0, 0), eyeV, normalV, false)
      const c2 = m.lighting(light, new Point(1.1, 0, 0), eyeV, normalV, false)
      expect(c1).toEqual(new Color(1, 1, 1))
      expect(c2).toEqual(new Color(0, 0, 0))
    })
  })
})
