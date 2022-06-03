import { Color } from '../tuples'
import {
  colorArrayToString,
  createBlackCanvas,
  scaleColorValue
} from './helpers'
import { Matrix } from './types'

export class Canvas {
  width: number
  height: number
  canvas: Matrix

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.canvas = createBlackCanvas(width, height)
  }

  writePixel(x: number, y: number, color: Color): void {
    this.canvas[x][y] = scaleColorValue(color)
  }

  pixelAt(x: number, y: number): Color {
    return this.canvas[x][y]
  }

  toPPM(): string {
    const header = `P3\n${this.width} ${this.height}\n255\n`

    const data: Color[] = []
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        data.push(this.canvas[i][j])
      }
    }

    return header + colorArrayToString(data, 5)
  }
}
