import {
  MatrixTypeFour,
  MatrixTypeThree,
  MatrixTypeTwo
} from '../matrices/types'
import { Matrix } from '../matrices/Matrix'
import { Point, Tuple, Vector } from '../tuples'
import { IDENTITY_MATRIX } from '../matrices/constants'
import { degreesToRadians, toFixed } from '../utils'

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

  it('should calculate the determinant of a 2x2 matrix', () => {
    const a = [
      [1, 5],
      [-3, 2]
    ]
    expect(Matrix.determinant(a)).toBe(17)
  })

  it('should generate a submatrix of a 3x3 matrix', () => {
    const a = [
      [1, 5, 0],
      [-3, 2, 7],
      [0, 6, -3]
    ]
    expect(Matrix.submatrix(a, 0, 2)).toEqual([
      [-3, 2],
      [0, 6]
    ])
  })

  it('should generate a submatrix of a 4x4 matrix', () => {
    const a = [
      [-6, 1, 1, 6],
      [-8, 5, 8, 6],
      [-1, 0, 8, 2],
      [-7, 1, -1, 1]
    ]
    expect(Matrix.submatrix(a, 2, 1)).toEqual([
      [-6, 1, 6],
      [-8, 8, 6],
      [-7, -1, 1]
    ])
  })

  it('should calculate a minor of a 3x3 matrix', () => {
    const a = [
      [3, 5, 0],
      [2, -1, -7],
      [6, -1, 5]
    ]
    const b = Matrix.submatrix(a, 1, 0)
    expect(Matrix.determinant(b)).toBe(25)
    expect(Matrix.minor(a, 1, 0)).toBe(25)
  })

  it('should calculate a cofactor of a 3x3 matrix', () => {
    const a = [
      [3, 5, 0],
      [2, -1, -7],
      [6, -1, 5]
    ]

    expect(Matrix.minor(a, 0, 0)).toBe(-12)
    expect(Matrix.cofactor(a, 0, 0)).toBe(-12)

    expect(Matrix.minor(a, 1, 0)).toBe(25)
    expect(Matrix.cofactor(a, 1, 0)).toBe(-25)
  })

  it('should calculate the determinant of a 3x3 matrix', () => {
    const a = [
      [1, 2, 6],
      [-5, 8, -4],
      [2, 6, 4]
    ]

    expect(Matrix.cofactor(a, 0, 0)).toBe(56)
    expect(Matrix.cofactor(a, 0, 1)).toBe(12)
    expect(Matrix.cofactor(a, 0, 2)).toBe(-46)
    expect(Matrix.determinant(a)).toBe(-196)
  })

  it('should calculate the determinant of a 4x4 matrix', () => {
    const a = [
      [-2, -8, 3, 5],
      [-3, 1, 7, 3],
      [1, 2, -9, 6],
      [-6, 7, 7, -9]
    ]

    expect(Matrix.cofactor(a, 0, 0)).toBe(690)
    expect(Matrix.cofactor(a, 0, 1)).toBe(447)
    expect(Matrix.cofactor(a, 0, 2)).toBe(210)
    expect(Matrix.cofactor(a, 0, 3)).toBe(51)
    expect(Matrix.determinant(a)).toBe(-4071)
  })

  it('should test an invertible matrix for invertibility', () => {
    const a = [
      [6, 4, 4, 4],
      [5, 5, 7, 6],
      [4, -9, 3, -7],
      [9, 1, 7, -6]
    ]
    expect(Matrix.determinant(a)).toBe(-2120)
  })

  it('should test a non invertible matrix for invertibility', () => {
    const a = [
      [-4, 2, -2, -3],
      [9, 6, 2, 6],
      [0, -5, 1, -5],
      [0, 0, 0, 0]
    ]
    expect(Matrix.determinant(a)).toBe(0)
  })

  it('should calculate the inverse of a matrix', () => {
    const a = [
      [-5, 2, 6, -8],
      [1, -5, 1, 8],
      [7, 7, -6, -7],
      [1, -3, 7, 4]
    ]
    const b = Matrix.inverse(a)
    expect(Matrix.determinant(a)).toBe(532)
    expect(Matrix.cofactor(a, 2, 3)).toBe(-160)
    expect(b?.[3][2]).toBe(-160 / 532)
    expect(Matrix.cofactor(a, 3, 2)).toBe(105)
    expect(b?.[2][3]).toBe(105 / 532)
    expect(b).toEqual([
      [
        0.21804511278195488, 0.45112781954887216, 0.24060150375939848,
        -0.045112781954887216
      ],
      [
        -0.8082706766917294, -1.4567669172932332, -0.44360902255639095,
        0.5206766917293233
      ],
      [
        -0.07894736842105263, -0.2236842105263158, -0.05263157894736842,
        0.19736842105263158
      ],
      [
        -0.5225563909774437, -0.8139097744360902, -0.3007518796992481,
        0.30639097744360905
      ]
    ])
  })
  it('should calculate the inverse of another matrix', () => {
    const a = [
      [8, -5, 9, 2],
      [7, 5, 6, 1],
      [-6, 0, 9, 6],
      [-3, 0, -9, -4]
    ]
    expect(Matrix.inverse(a)).toEqual([
      [
        -0.15384615384615385, -0.15384615384615385, -0.28205128205128205,
        -0.5384615384615384
      ],
      [
        -0.07692307692307693, 0.12307692307692308, 0.02564102564102564,
        0.03076923076923077
      ],
      [
        0.358974358974359, 0.358974358974359, 0.4358974358974359,
        0.9230769230769231
      ],
      [
        -0.6923076923076923, -0.6923076923076923, -0.7692307692307693,
        -1.9230769230769231
      ]
    ])
  })
  it('should calculate the inverse of a third matrix', () => {
    const a = [
      [9, 3, 0, 9],
      [-5, -2, -6, -3],
      [-4, 9, 6, 4],
      [-7, 6, 6, 2]
    ]
    expect(Matrix.inverse(a)).toEqual([
      [
        -0.040740740740740744, -0.07777777777777778, 0.14444444444444443,
        -0.2222222222222222
      ],
      [
        -0.07777777777777778, 0.03333333333333333, 0.36666666666666664,
        -0.3333333333333333
      ],
      [
        -0.029012345679012345, -0.14629629629629629, -0.10925925925925926,
        0.12962962962962962
      ],
      [
        0.17777777777777778, 0.06666666666666667, -0.26666666666666666,
        0.3333333333333333
      ]
    ])
  })

  it('should multiply a product by its inverse', () => {
    const a = new Matrix([
      [3, -9, 7, 3],
      [3, -8, 2, -9],
      [-4, 4, 4, 1],
      [-6, 5, -1, 1]
    ])
    const b = new Matrix([
      [8, 2, 2, 2],
      [3, -1, 7, 0],
      [7, 0, 5, 4],
      [6, -2, 0, 5]
    ]).matrix as MatrixTypeFour

    const c = new Matrix(a.multiply(b))
    const d = c.multiply(Matrix.inverse(b) as MatrixTypeFour)

    expect(new Matrix(d).toFixed()).toEqual(a.matrix)
  })
})

describe('Matrix transformations', () => {
  it('should multiply by a translation matrix', () => {
    const transformMatrix = new Matrix(Matrix.translation(5, -3, 2))
    const point = new Point(-3, 4, 5)
    const result = transformMatrix.multiplyByTuple(point)
    expect(result).toEqual(new Point(2, 1, 7))
  })

  it('should multiply by the inverse of a translation matrix', () => {
    const transformMatrix = new Matrix(Matrix.translation(5, -3, 2))
    const inverse = new Matrix(
      Matrix.inverse(transformMatrix.matrix) as MatrixTypeFour
    )
    const point = new Point(-3, 4, 5)
    const result = inverse.multiplyByTuple(point)
    expect(result).toEqual(new Point(-8, 7, 3))
  })

  it('should not affect vector when multiplying matrix by it', () => {
    const transformMatrix = new Matrix(Matrix.translation(5, -3, 2))
    const vector = new Vector(-3, 4, 5)
    expect(transformMatrix.multiplyByTuple(vector)).toEqual(vector)
  })

  it('should apply scaling to a point', () => {
    const transformMatrix = new Matrix(Matrix.scaling(2, 3, 4))
    const point = new Point(-4, 6, 8)
    const result = transformMatrix.multiplyByTuple(point)
    expect(result).toEqual(new Point(-8, 18, 32))
  })

  it('should apply scaling to a vector', () => {
    const transformMatrix = new Matrix(Matrix.scaling(2, 3, 4))
    const vector = new Vector(-4, 6, 8)
    const result = transformMatrix.multiplyByTuple(vector)
    expect(result).toEqual(new Vector(-8, 18, 32))
  })

  it('should multiply by the inverse of a scaling matrix', () => {
    const transformMatrix = new Matrix(Matrix.scaling(2, 3, 4)).matrix
    const vector = new Vector(-4, 6, 8)
    const inverse = new Matrix(
      Matrix.inverse(transformMatrix) as MatrixTypeFour
    )

    const result = inverse.multiplyByTuple(vector)
    expect(result).toEqual(new Vector(-2, 2, 2))
  })

  it('Reflection is scaling by a negative value', () => {
    const transformMatrix = new Matrix(Matrix.scaling(-1, 1, 1))
    const point = new Point(2, 3, 4)
    const result = transformMatrix.multiplyByTuple(point)
    expect(result).toEqual(new Point(-2, 3, 4))
  })

  it('should rotate a point around the x axis', () => {
    const point = new Point(0, 1, 0)
    const halfQuarter = new Matrix(Matrix.rotationX(degreesToRadians(45)))
    const fullQuarter = new Matrix(Matrix.rotationX(degreesToRadians(90)))

    expect(halfQuarter.multiplyByTuple(point)).toEqual(
      new Point(0, toFixed(Math.sqrt(2) / 2), toFixed(Math.sqrt(2) / 2))
    )
    expect(fullQuarter.multiplyByTuple(point)).toEqual(new Point(0, 0, 1))
  })

  it('should rotate in the opposite direction if inverse the rotateX matrix', () => {
    const point = new Point(0, 1, 0)
    const halfQuarter = Matrix.rotationX(degreesToRadians(45))
    const inverse = new Matrix(Matrix.inverse(halfQuarter) as MatrixTypeFour)

    expect(inverse.multiplyByTuple(point)).toEqual(
      new Point(0, toFixed(Math.sqrt(2) / 2, 4), -toFixed(Math.sqrt(2) / 2, 4))
    )
  })
})
