import { Color, Point } from '../tuples'
import { PointLight } from '../lights/PointLight'
import { Material } from '../lights/Material'

describe('Lights', () => {
  it(', a light, should have a position and intensity', () => {
    const intensity = new Color(1, 1, 1)
    const position = new Point(0, 0, 0)
    const light = new PointLight(position, intensity)
    expect(light.position).toEqual(position)
    expect(light.intensity).toEqual(intensity)
  })

  it('should have a default material', () => {
    const m = new Material()
    expect(m.color).toEqual(new Color(1, 1, 1))
    expect(m.ambient).toEqual(0.1)
    expect(m.diffuse).toEqual(0.9)
    expect(m.specular).toEqual(0.9)
    expect(m.shininess).toEqual(200.0)
  })
})
