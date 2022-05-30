import { BLACK, Color } from '../tuples'

export class Canvas {
  width: number
  height: number
  canvas: Color[][]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.canvas = Array<Color[]>(width).fill(Array(height).fill(BLACK))
  }

  writePixel(width: number, height: number, color: Color): void {
    this.canvas[width][height] = color
  }

  pixelAt(width: number, height: number): Color {
    return this.canvas[width][height]
  }
}
