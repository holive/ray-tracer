import { MatrixTypeFour, MatrixTypeThree, MatrixTypeTwo } from './types'
import { Tuple } from '../tuples'

export class Matrix {
  readonly matrix: number[][]

  constructor(matrix: MatrixTypeFour | MatrixTypeThree | MatrixTypeTwo) {
    this.matrix = matrix
  }

  at(x: number, y: number): number {
    return this.matrix[x][y]
  }

  equals({ matrix }: Matrix): boolean {
    return this.matrix.every(function goOverEachRow(row, i) {
      return row.every(function compareColumns(element, j) {
        return element == matrix[i][j]
      })
    })
  }

  getMatrix<T>(): T {
    return this.matrix as unknown as T
  }

  multiply(matrix: MatrixTypeFour): MatrixTypeFour {
    return Matrix.multiplyMatrices(this.matrix, matrix) as MatrixTypeFour
  }

  multiplyByTuple(tuple: Tuple): Tuple {
    const newMatrix = (function convertTupleToMatrix() {
      return new Matrix([
        [tuple.x, 0, 0, 0],
        [tuple.y, 0, 0, 0],
        [tuple.z, 0, 0, 0],
        [tuple.w, 0, 0, 0]
      ]).getMatrix<MatrixTypeFour>()
    })()

    const multiplied = Matrix.multiplyMatrices(this.matrix, newMatrix)

    return (function returnTheFirstColumnAsTuple() {
      return new Tuple(
        multiplied[0][0],
        multiplied[1][0],
        multiplied[2][0],
        multiplied[3][0]
      )
    })()
  }

  transpose<T>(): T {
    const newMatrix = Matrix.generateNewMatrix(this.matrix.length)

    this.matrix.forEach(function goOverEachRow(row, rowPosit, source) {
      row.forEach(function transposeColumnsIntoRows(element, columnPosit) {
        newMatrix[rowPosit][columnPosit] = source[columnPosit][rowPosit]
      })
    })

    return newMatrix as unknown as T
  }

  static submatrix(
    matrix: number[][],
    rowToRemove: number,
    columnToRemove: number
  ): number[][] {
    const length = matrix.length
    const subMatrix = this.generateNewMatrix(length - 1)

    let newColumnPosition = 0
    let newRowPosition = 0

    for (let rowPosition = 0; rowPosition < length; rowPosition++) {
      if (rowPosition == rowToRemove) continue
      iterateOverColumnsAndSkipOne(rowPosition)
      newRowPosition++
    }

    function iterateOverColumnsAndSkipOne(rowPosition: number) {
      for (let columnPosition = 0; columnPosition < length; columnPosition++) {
        const isLastColumn = columnPosition == length - 1
        const shouldSkipTheCurrentColumn = columnPosition == columnToRemove

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
      subMatrix[newRowPosition][newColumnPosition] =
        matrix[rowPosition][columnPosition]
    }

    function incrementSubmatrixColumnPosition(
      columnPosition: number,
      isLastColumn: boolean
    ) {
      if (isLastColumn) newColumnPosition = 0
      else newColumnPosition++
    }

    return subMatrix
  }

  static minor(matrix: number[][], row: number, column: number): number {
    const submatrix = this.submatrix(matrix, row, column)
    return this.determinant(submatrix)
  }

  static cofactor(matrix: number[][], row: number, column: number): number {
    const isOdd = (row + column) % 2 != 0
    const minor = this.minor(matrix, row, column)
    return isOdd ? -Number(minor) : minor
  }

  static determinant(matrix: number[][]): number {
    let result = 0

    if (matrix.length == 2) {
      result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    } else {
      for (let column = 0; column < matrix.length; column++) {
        result = result + matrix[0][column] * this.cofactor(matrix, 0, column)
      }
    }

    return result
  }

  private static multiplyMatrices(a: number[][], b: number[][]): number[][] {
    const newMatrix = this.generateNewMatrix(4)

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

  private static generateNewMatrix(length: number): number[][] {
    const newMatrix: number[][] = []
    for (let i = 0; i < length; i++) {
      newMatrix.push(new Array(length).fill(null))
    }
    return newMatrix
  }
}
