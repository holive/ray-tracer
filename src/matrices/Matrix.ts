import { MatrixTypeFour, MatrixTypeThree, MatrixTypeTwo } from './types'
import { Point, Tuple, Vector } from '../tuples'
import {
  dotProductOfEachElement,
  getCosSinFromRadians,
  removeRowAndColumn
} from './helpers'
import { toFixed } from '../utils'

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
        toFixed(multiplied[0][0]),
        toFixed(multiplied[1][0]),
        toFixed(multiplied[2][0]),
        toFixed(multiplied[3][0])
      )
    })()
  }

  multiplyByTupleP(tuple: Tuple): Point {
    const multiplied = Matrix.multiplyMatrices(this.matrix, [
      [tuple.x, 0, 0, 0],
      [tuple.y, 0, 0, 0],
      [tuple.z, 0, 0, 0],
      [tuple.w, 0, 0, 0]
    ])

    return new Point(
      multiplied[0][0],
      multiplied[1][0],
      multiplied[2][0],
      multiplied[3][0]
    )
  }

  multiplyByTupleV(tuple: Tuple): Vector {
    const multiplied = Matrix.multiplyMatrices(this.matrix, [
      [tuple.x, 0, 0, 0],
      [tuple.y, 0, 0, 0],
      [tuple.z, 0, 0, 0],
      [tuple.w, 0, 0, 0]
    ])

    return new Vector(
      multiplied[0][0],
      multiplied[1][0],
      multiplied[2][0],
      multiplied[3][0]
    )
  }

  transpose<T>(): T {
    // removing dynamic generation to speed up
    const newMatrix = [
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN]
    ]

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

    // removing dynamic generation to speed up
    const newMatrix = [
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN]
    ]

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
  static translationC(x: number, y: number, z: number): Matrix {
    return new Matrix(Matrix.translation(x, y, z))
  }

  static scaling(x: number, y: number, z: number): MatrixTypeFour {
    return [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1]
    ]
  }
  static scalingC(x: number, y: number, z: number): Matrix {
    return new Matrix(Matrix.scaling(x, y, z))
  }

  static rotationX(radians: number): MatrixTypeFour {
    const { cos, sin } = getCosSinFromRadians(radians)

    return [
      [1, 0, 0, 0],
      [0, cos, -sin, 0],
      [0, sin, cos, 0],
      [0, 0, 0, 1]
    ]
  }
  static rotationXC(radians: number): Matrix {
    return new Matrix(Matrix.rotationX(radians))
  }

  static rotationY(radians: number): MatrixTypeFour {
    const { cos, sin } = getCosSinFromRadians(radians)

    return [
      [cos, 0, sin, 0],
      [0, 1, 0, 0],
      [-sin, 0, cos, 0],
      [0, 0, 0, 1]
    ]
  }
  static rotationYC(radians: number): Matrix {
    return new Matrix(Matrix.rotationY(radians))
  }

  static rotationZ(radians: number): MatrixTypeFour {
    const { cos, sin } = getCosSinFromRadians(radians)

    return [
      [cos, -sin, 0, 0],
      [sin, cos, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]
  }
  static rotationZC(radians: number): Matrix {
    return new Matrix(Matrix.rotationZ(radians))
  }

  static shearing(
    xY: number,
    xZ: number,
    yX: number,
    yZ: number,
    zX: number,
    zY: number
  ): MatrixTypeFour {
    return [
      [1, xY, xZ, 0],
      [yX, 1, yZ, 0],
      [zX, zY, 1, 0],
      [0, 0, 0, 1]
    ]
  }

  private static multiplyMatrices(a: number[][], b: number[][]): number[][] {
    return dotProductOfEachElement(a, b)
  }
}
