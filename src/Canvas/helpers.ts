import { BLACK, Color } from '../tuples'
import { Matrix } from './types'

export const scaleColorValue = ({ red, green, blue }: Color): Color => {
  const clamp = (c: number): number =>
    c < 0 ? 0 : c > 255 ? 255 : Math.round(c)
  return new Color(clamp(red * 255), clamp(green * 255), clamp(blue * 255))
}

export const createBlackCanvas = (width: number, height: number): Matrix => {
  const matrix: Matrix = []
  for (let i = 0; i < width; i++) {
    matrix.push(new Array(height).fill(BLACK))
  }
  return matrix
}

const colorToString = ({ red, green, blue }: Color): string => {
  return `${red} ${green} ${blue}`
}

export const colorArrayToString = (
  colors: Color[],
  maxColorsPerLine: number
): string => {
  let body = ''
  const newColors = [...colors]

  while (newColors.length) {
    body +=
      newColors
        .splice(0, maxColorsPerLine)
        .map((c) => colorToString(c))
        .join(' ') + '\n'
  }

  return body
}
