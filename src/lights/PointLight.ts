import { Color, Point } from '../tuples'

export class PointLight {
  intensity: Color
  position: Point

  constructor(position: Point, intensity: Color) {
    this.intensity = intensity
    this.position = position
  }
}
