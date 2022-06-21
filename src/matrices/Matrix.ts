import { MatrixTypeFour, MatrixTypeThree, MatrixTypeTwo } from './types'
import { Tuple } from '../tuples'
import {
  dotProductOfEachElement,
  generateNewMatrix,
  removeRowAndColumn
} from './helpers'

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
    const newMatrix = generateNewMatrix(this.matrix.length)

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
    return removeRowAndColumn(matrix, rowToRemove, columnToRemove)
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

  static inverse(matrix: number[][]): number[][] | undefined {
    if (this.determinant(matrix) == 0) {
      return
    }

    const newMatrix = generateNewMatrix(matrix.length)

    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        const cofactor = this.cofactor(matrix, row, col)
        // note that "col, row" here, to inverse
        newMatrix[col][row] = cofactor / this.determinant(matrix)
      }
    }

    return newMatrix
  }

  toFixed(): number[][] {
    return this.matrix.map((rows) =>
      rows.map((column) => Number(column.toFixed(5)))
    )
  }

  static translation(x: number, y: number, z: number): MatrixTypeFour {
    return [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1]
    ]
  }

  static scaling(x: number, y: number, z: number): MatrixTypeFour {
    return [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1]
    ]
  }

  private static multiplyMatrices(a: number[][], b: number[][]): number[][] {
    return dotProductOfEachElement(a, b)
  }
}
