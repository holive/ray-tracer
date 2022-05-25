import {
  addTuples,
  dot,
  equalTuples,
  magnitude,
  multiplyTuples,
  negateTuple,
  normalize,
  point,
  subtractTuples,
  tuple,
  vector
} from '../tuples'
import { PointOrVector } from '../types'
import { InvalidTupleAddition } from '../errors'

describe('Tuples', () => {
  it('should be a point when w=1', () => {
    const a = tuple(4.3, -4.2, 3.1, 1)

    expect(a.x).toBe(4.3)
    expect(a.y).toBe(-4.2)
    expect(a.z).toBe(3.1)
    expect(a.w).toBe(1)
    expect(a.w).toEqual(PointOrVector.POINT)
    expect(a.w).not.toEqual(PointOrVector.VECTOR)
  })

  it('should be a vector when w=0', () => {
    const a = tuple(2.3, -2.2, 2.1, 0)

    expect(a.x).toBe(2.3)
    expect(a.y).toBe(-2.2)
    expect(a.z).toBe(2.1)
    expect(a.w).toBe(0)
    expect(a.w).toEqual(PointOrVector.VECTOR)
    expect(a.w).not.toEqual(PointOrVector.POINT)
  })

  it('should create tuples with w=1 from point()', () => {
    const p = point(4, -4, 3)
    const t = tuple(4, -4, 3, 1)
    expect(p).toEqual(t)
  })

  it('should create tuples with w=1 from vector()', () => {
    const p = vector(4, -4, 3)
    const v = tuple(4, -4, 3, 0)
    expect(p).toEqual(v)
  })

  it('should compare tuples', () => {
    const a = tuple(4, -4, 3, 0)
    const b = tuple(4, -4, 3, 0)
    expect(equalTuples(a, b)).toBeTruthy()

    const c = tuple(4, -4, 3, 1)
    const d = tuple(4, -4, 3, 0)
    expect(equalTuples(c, d)).toBeFalsy()
  })

  it('should add tuples', () => {
    const a = tuple(3, -2, 5, 1)
    const b = tuple(-2, 3, 1, 0)
    expect(addTuples(a, b)).toEqual(tuple(1, 1, 6, 1))

    expect(() => {
      addTuples(a, a)
    }).toThrow(new InvalidTupleAddition())
  })
})

describe('Subtract', () => {
  it('should subtract two points', () => {
    const a = point(3, 2, 1)
    const b = point(5, 6, 7)
    expect(subtractTuples(a, b)).toEqual(vector(-2, -4, -6))
  })

  it('should subtract a vector from a point', () => {
    const a = point(3, 2, 1)
    const b = vector(5, 6, 7)
    expect(subtractTuples(a, b)).toEqual(point(-2, -4, -6))
  })

  it('should subtract two vectors', () => {
    const a = vector(3, 2, 1)
    const b = vector(5, 6, 7)
    expect(subtractTuples(a, b)).toEqual(vector(-2, -4, -6))
  })

  it('should subtract a vector from the zero vector', () => {
    const a = vector(0, 0, 0)
    const b = vector(1, -2, 3)
    expect(subtractTuples(a, b)).toEqual(vector(-1, 2, -3))
  })

  it('should negate a tuple', () => {
    const result = negateTuple(tuple(1, -2, 3, -4))
    expect(result).toEqual(tuple(-1, 2, -3, 4))
  })
})

describe('Multiply', () => {
  it('should multiply a tuple by a scalar', () => {
    const a = tuple(1, -2, 3, -4)
    expect(multiplyTuples(a, 3.5)).toEqual(tuple(3.5, -7, 10.5, -14))
  })

  it('should multiply a tuple by a fraction', () => {
    const a = tuple(1, -2, 3, -4)
    expect(multiplyTuples(a, 0.5)).toEqual(tuple(0.5, -1, 1.5, -2))
  })
})

describe('Magnitude', () => {
  it('should compute the magnitude of vectors', () => {
    expect(magnitude(vector(1, 0, 0))).toEqual(1)
    expect(magnitude(vector(0, 1, 0))).toEqual(1)
    expect(magnitude(vector(0, 0, 1))).toEqual(1)
    expect(magnitude(vector(1, 2, 3))).toEqual(Math.sqrt(14))
  })
})

describe('Normalization', () => {
  it('should normalize vectors', () => {
    expect(normalize(vector(4, 0, 0))).toEqual(vector(1, 0, 0))
    expect(normalize(vector(1, 2, 3))).toEqual(
      vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
    )
  })

  it('should have the right magnitude of a normalized vector', () => {
    const normalizedVector = normalize(vector(4, 0, 0))
    expect(magnitude(normalizedVector)).toBe(1)
  })
})

describe('Dot product', () => {
  it('should return the dot product of two tuples', () => {
    const a = vector(1, 2, 3)
    const b = vector(2, 3, 4)
    expect(dot(a, b)).toBe(20)
  })
})
