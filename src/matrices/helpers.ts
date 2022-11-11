import { toFixed } from '../utils'

export function removeRowAndColumn(
  matrix: number[][],
  row: number,
  column: number
): number[][] {
  let newRowPosition = 0
  let newColumnPosition = 0
  const length = matrix.length

  const newMatrix = generateNewMatrix(length - 1)

  for (let rowPosition = 0; rowPosition < length; rowPosition++) {
    if (rowPosition == row) continue

    for (let columnPosition = 0; columnPosition < length; columnPosition++) {
      const isLastColumn = columnPosition == length - 1
      const shouldSkipTheCurrentColumn = columnPosition == column

      if (shouldSkipTheCurrentColumn) {
        if (isLastColumn) newColumnPosition = 0
        continue
      }

      newMatrix[newRowPosition][newColumnPosition] =
        matrix[rowPosition][columnPosition]

      if (isLastColumn) newColumnPosition = 0
      else newColumnPosition++
    }

    newRowPosition++
  }

  return newMatrix
}

export function dotProductOfEachElement(
  a: number[][],
  b: number[][]
): number[][] {
  // removing dynamic generation to speed up
  const newMatrix = [
    [NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN]
  ]

  a.forEach(function goOverEachRow(row, rowPosition) {
    row.forEach(function dotProductOfEveryColumnCombination(
      columnElement,
      columnPosition
    ) {
      newMatrix[rowPosition][columnPosition] =
        a[rowPosition][0] * b[0][columnPosition] +
        a[rowPosition][1] * b[1][columnPosition] +
        a[rowPosition][2] * b[2][columnPosition] +
        a[rowPosition][3] * b[3][columnPosition]
    })
  })

  return newMatrix
}

export function generateNewMatrix(length: number): number[][] {
  const newMatrix: number[][] = []
  for (let i = 0; i < length; i++) {
    newMatrix.push(new Array(length).fill(null))
  }
  return newMatrix
}

export function getCosSinFromRadians(radians: number): {
  sin: number
  cos: number
} {
  return {
    cos: toFixed(Math.cos(radians)),
    sin: toFixed(Math.sin(radians))
  }
}
