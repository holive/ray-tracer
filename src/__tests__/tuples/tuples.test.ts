import { InvalidTupleAddition } from '../../errors'
import { PointOrVector, Tuple, Vector, Point } from '../../tuples'

describe('Tuples', () => {
  it('should be a point when w=1', () => {
    const a = new Tuple(4.3, -4.2, 3.1, 1)

    expect(a.x).toBe(4.3)
    expect(a.y).toBe(-4.2)
    expect(a.z).toBe(3.1)
    expect(a.w).toBe(1)
    expect(a.w).toEqual(PointOrVector.POINT)
    expect(a.w).not.toEqual(PointOrVector.VECTOR)
  })

  it('should be a vector when w=0', () => {
    const a = new Tuple(2.3, -2.2, 2.1, 0)

    expect(a.x).toBe(2.3)
    expect(a.y).toBe(-2.2)
    expect(a.z).toBe(2.1)
    expect(a.w).toBe(0)
    expect(a.w).toEqual(PointOrVector.VECTOR)
    expect(a.w).not.toEqual(PointOrVector.POINT)
  })

  it('should create tuples with w=1 from new Point()', () => {
    const p = new Point(4, -4, 3)
    const t = new Tuple(4, -4, 3, 1)
    expect(p).toEqual(t)
  })

  it('should create tuples with w=1 from new Vector()', () => {
    const p = new Vector(4, -4, 3)
    const v = new Tuple(4, -4, 3, 0)
    expect(p).toEqual(v)
  })

  it('should compare tuples', () => {
    const a = new Tuple(4, -4, 3, 0)
    const b = new Tuple(4, -4, 3, 0)
    expect(a.equal(b)).toBeTruthy()

    const c = new Tuple(4, -4, 3, 1)
    const d = new Tuple(4, -4, 3, 0)
    expect(c.equal(d)).toBeFalsy()
  })

  it('should add tuples', () => {
    const a = new Tuple(3, -2, 5, 1)
    const b = new Tuple(-2, 3, 1, 0)
    expect(a.add(b)).toEqual(new Tuple(1, 1, 6, 1))

    expect(() => {
      a.add(a)
    }).toThrow(new InvalidTupleAddition())
  })
})

describe('Subtract', () => {
  it('should subtract two points', () => {
    const a = new Point(3, 2, 1)
    const b = new Point(5, 6, 7)
    expect(a.subtract(b)).toEqual(new Vector(-2, -4, -6))
  })

  it('should subtract a vector from a point', () => {
    const a = new Point(3, 2, 1)
    const b = new Vector(5, 6, 7)
    expect(a.subtract(b)).toEqual(new Point(-2, -4, -6))
  })

  it('should subtract two vectors', () => {
    const a = new Vector(3, 2, 1)
    const b = new Vector(5, 6, 7)
    expect(a.subtract(b)).toEqual(new Vector(-2, -4, -6))
  })

  it('should subtract a vector from the zero vector', () => {
    const a = new Vector(0, 0, 0)
    const b = new Vector(1, -2, 3)
    expect(a.subtract(b)).toEqual(new Vector(-1, 2, -3))
  })

  it('should negate a tuple', () => {
    expect(new Tuple(1, -2, 3, -4).negate()).toEqual(new Tuple(-1, 2, -3, 4))
  })
})

describe('Multiply', () => {
  it('should multiply a tuple by a scalar', () => {
    const a = new Tuple(1, -2, 3, -4)
    expect(a.multiply(3.5)).toEqual(new Tuple(3.5, -7, 10.5, -14))
  })

  it('should multiply a tuple by a fraction', () => {
    const a = new Tuple(1, -2, 3, -4)
    expect(a.multiply(0.5)).toEqual(new Tuple(0.5, -1, 1.5, -2))
  })
})

describe('Magnitude', () => {
  it('should compute the magnitude of vectors', () => {
    expect(new Vector(1, 0, 0).magnitude()).toEqual(1)
    expect(new Vector(0, 1, 0).magnitude()).toEqual(1)
    expect(new Vector(0, 0, 1).magnitude()).toEqual(1)
    expect(new Vector(1, 2, 3).magnitude()).toEqual(Math.sqrt(14))
  })
})

describe('Normalization', () => {
  it('should normalize vectors', () => {
    expect(new Vector(4, 0, 0).normalize()).toEqual(new Vector(1, 0, 0))
    expect(new Vector(1, 2, 3).normalize()).toEqual(
      new Vector(1 / Math.sqrt(14), 2 / Math.sqrt(14), 3 / Math.sqrt(14))
    )
  })

  it('should have the right magnitude of a normalized vector', () => {
    const normalizedVector = new Vector(4, 0, 0).normalize()
    expect(normalizedVector.magnitude()).toBe(1)
  })
})

describe('Dot Product', () => {
  it('should return the dot product of two tuples', () => {
    const a = new Vector(1, 2, 3)
    const b = new Vector(2, 3, 4)
    expect(a.dot(b)).toBe(20)
  })
})

describe('Cross Product', () => {
  it('should return the cross product of two tuples', () => {
    const a = new Vector(1, 2, 3)
    const b = new Vector(2, 3, 4)
    expect(a.cross(b)).toEqual(new Vector(-1, 2, -1))
    expect(b.cross(a)).toEqual(new Vector(1, -2, 1))
  })
})
