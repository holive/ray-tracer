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
    iterateOverColumnsAndSkipOne(rowPosition)
    newRowPosition++
  }

  function iterateOverColumnsAndSkipOne(rowPosition: number) {
    for (let columnPosition = 0; columnPosition < length; columnPosition++) {
      const isLastColumn = columnPosition == length - 1
      const shouldSkipTheCurrentColumn = columnPosition == column

      if (shouldSkipTheCurrentColumn) {
        if (isLastColumn) newColumnPosition = 0
        continue
      }

      assignValueToNewPosition(rowPosition, columnPosition)
      incrementSubmatrixColumnPosition(columnPosition, isLastColumn)
    }
  }

  function assignValueToNewPosition(
    rowPosition: number,
    columnPosition: number
  ) {
    newMatrix[newRowPosition][newColumnPosition] =
      matrix[rowPosition][columnPosition]
  }

  function incrementSubmatrixColumnPosition(
    columnPosition: number,
    isLastColumn: boolean
  ) {
    if (isLastColumn) newColumnPosition = 0
    else newColumnPosition++
  }

  return newMatrix
}

export function dotProductOfEachElement(
  a: number[][],
  b: number[][]
): number[][] {
  const newMatrix = generateNewMatrix(a.length)

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
