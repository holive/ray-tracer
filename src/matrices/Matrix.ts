import { MatrixTypeFour, MatrixTypeThree, MatrixTypeTwo } from './types'

export class Matrix {
  readonly matrix: number[][]

  constructor(matrix: MatrixTypeFour | MatrixTypeThree | MatrixTypeTwo) {
    this.matrix = matrix
  }

  at(x: number, y: number): number {
    return this.matrix[x][y]
  }

  equals({ matrix }: Matrix): boolean {
    return this.matrix.every(function goOverEachRow(row: number[], i: number) {
      return row.every(function compareColumns(element: number, j: number) {
        return element == matrix[i][j]
      })
    })
  }
}
