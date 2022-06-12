import {
  MatrixTypeFour,
  MatrixTypeThree,
  MatrixTypeTwo
} from '../matrices/types'
import { Matrix } from '../matrices/Matrix'
import { Tuple } from '../tuples'
import { IDENTITY_MATRIX } from '../matrices/constants'

describe('Matrices', () => {
  it('should construct and inspect a 4x4 matrix', () => {
    const input: MatrixTypeFour = [
      [1, 2, 3, 4],
      [5.5, 6.5, 7.5, 8.5],
      [9, 10, 11, 12],
      [13.5, 14.5, 15.5, 16.5]
    ]

    const matrix = new Matrix(input)
    expect(matrix.at(0, 0)).toBe(1)
    expect(matrix.at(0, 3)).toBe(4)
    expect(matrix.at(1, 0)).toBe(5.5)
    expect(matrix.at(1, 2)).toBe(7.5)
    expect(matrix.at(2, 2)).toBe(11)
    expect(matrix.at(3, 0)).toBe(13.5)
    expect(matrix.at(3, 2)).toBe(15.5)
  })

  it('should construct and inspect a 3x3 matrix', () => {
    const input: MatrixTypeThree = [
      [-3, 5, 0],
      [1, -2, -7],
      [0, 1, 1]
    ]

    const matrix = new Matrix(input)
    expect(matrix.at(0, 0)).toBe(-3)
    expect(matrix.at(1, 1)).toBe(-2)
    expect(matrix.at(2, 2)).toBe(1)
  })

  it('should construct and inspect a 2x2 matrix', () => {
    const input: MatrixTypeTwo = [
      [-3, 5],
      [1, -2]
    ]

    const matrix = new Matrix(input)
    expect(matrix.at(0, 0)).toBe(-3)
    expect(matrix.at(0, 1)).toBe(5)
    expect(matrix.at(1, 0)).toBe(1)
    expect(matrix.at(1, 1)).toBe(-2)
  })

  it('should return true when comparing two equal matrices', () => {
    const input: MatrixTypeFour = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2]
    ]
    const a = new Matrix(input)
    const b = new Matrix(input)

    expect(a.equals(b)).toBeTruthy()
  })

  it('should return false when comparing two different matrices', () => {
    const inputA: MatrixTypeFour = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2]
    ]
    const inputB: MatrixTypeFour = [
      [5, 4, 3, 2],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6]
    ]
    const a = new Matrix(inputA)
    const b = new Matrix(inputB)

    expect(a.equals(b)).toBeFalsy()
  })

  it('should multiply two matrices', () => {
    const inputA: MatrixTypeFour = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2]
    ]
    const inputB: MatrixTypeFour = [
      [-2, 1, 2, 3],
      [3, 2, 1, -1],
      [4, 3, 6, 5],
      [1, 2, 7, 8]
    ]
    const expected: MatrixTypeFour = [
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42]
    ]
    const a = new Matrix(inputA)
    const b = new Matrix(inputB)

    expect(a.multiply(b.getMatrix<MatrixTypeFour>())).toEqual(expected)
  })

  it('should multiply a matrix by a tuple', () => {
    const A: MatrixTypeFour = [
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1]
    ]
    const b = new Tuple(1, 2, 3, 1)

    expect(new Matrix(A).multiplyByTuple(b)).toEqual(new Tuple(18, 24, 33, 1))
  })

  it('should multiply a matrix by the identity matrix', () => {
    const matrix = new Matrix([
      [0, 1, 2, 4],
      [1, 2, 4, 8],
      [2, 4, 8, 16],
      [4, 8, 16, 32]
    ])

    expect(matrix.multiply(new Matrix(IDENTITY_MATRIX).getMatrix())).toEqual(
      matrix.matrix
    )
  })

  it('should multiply a matrix by a tuple', () => {
    const tuple = new Tuple(1, 2, 3, 4)
    expect(new Matrix(IDENTITY_MATRIX).multiplyByTuple(tuple)).toEqual(tuple)
  })

  it('should transpose a matrix', () => {
    const matrix = new Matrix([
      [0, 9, 3, 0],
      [9, 8, 0, 8],
      [1, 8, 5, 3],
      [0, 0, 5, 8]
    ])
    const transposed = [
      [0, 9, 1, 0],
      [9, 8, 8, 0],
      [3, 0, 5, 5],
      [0, 8, 3, 8]
    ]
    expect(matrix.transpose()).toEqual(transposed)
  })

  it('should transpose the identity matrix', () => {
    expect(new Matrix(IDENTITY_MATRIX).transpose()).toEqual(IDENTITY_MATRIX)
  })
})
