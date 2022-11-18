import { BLACK, Color } from '../tuples'
import { ColorMatrix } from './types'
import { PPM_MAX_COLORS_PER_LINE } from './constants'
import * as fs from 'fs/promises'

export const scaleColorValue = ({ red, green, blue }: Color): Color => {
  const clamp = (c: number): number =>
    c < 0 ? 0 : c > 255 ? 255 : Math.round(c)
  return new Color(clamp(red * 255), clamp(green * 255), clamp(blue * 255))
}

export const createBlackCanvas = (
  width: number,
  height: number
): ColorMatrix => {
  const matrix: ColorMatrix = []
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
  maxColorsPerLine = PPM_MAX_COLORS_PER_LINE
): string => {
  let body = ''
  let counter = 0

  colors.forEach((color) => {
    counter += 1
    let divider = ` `

    if (counter >= maxColorsPerLine) {
      divider = `\n`
      counter = 0
    }

    body += `${colorToString(color)}${divider}`
  })

  return body + '\n'
}

export const writeFile = (content: string, index?: number): string => {
  try {
    void fs.writeFile(`./render${index || ''}.ppm`, content)
    return content
  } catch (err) {
    return `Couldn't write the file: ${((err as Error) || undefined)?.message}`
  }
}
