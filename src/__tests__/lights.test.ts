import { Color, Point } from '../tuples'
import { PointLight } from '../lights/PointLight'

describe('Lights', () => {
  it(', a light, should have a position and intensity', () => {
    const intensity = new Color(1, 1, 1)
    const position = new Point(0, 0, 0)
    const light = new PointLight(position, intensity)
    expect(light.position).toEqual(position)
    expect(light.intensity).toEqual(intensity)
  })
})
