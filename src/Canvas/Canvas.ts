import { Color } from '../tuples'
import {
  colorArrayToString,
  createBlackCanvas,
  scaleColorValue,
  writeFile
} from './helpers'
import { ColorMatrix } from './types'

export class Canvas {
  width: number
  height: number
  private readonly canvas: ColorMatrix

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.canvas = createBlackCanvas(height, width)
  }

  writePixel(x: number, y: number, color: Color): void {
    this.canvas[y][x] = scaleColorValue(color)
  }

  pixelAt(x: number, y: number): Color {
    return this.canvas[y][x]
  }

  toPPM(): string {
    const header = `P3\n${this.width} ${this.height}\n255\n`

    const data: Color[] = []
    this.canvas
      .reverse() // flip the image vertically, because the canvas direction is from top to bottom
      .forEach((items) => items.forEach((color) => data.push(color)))

    return writeFile(header + colorArrayToString(data))
  }

  getCanvas(): ColorMatrix {
    return this.canvas
  }
}
