import { point, tuple, vector } from '../tuples'
import { PointOrVector } from '../types'

describe('tuples', () => {
  it('A tuple with w=1 is a point', () => {
    const a = tuple(4.3, -4.2, 3.1, 1)

    expect(a.x).toBe(4.3)
    expect(a.y).toBe(-4.2)
    expect(a.z).toBe(3.1)
    expect(a.w).toBe(1)
    expect(a.w).toEqual(PointOrVector.POINT)
    expect(a.w).not.toEqual(PointOrVector.VECTOR)
  })

  it('A tuple with w=0 is a vector', () => {
    const a = tuple(2.3, -2.2, 2.1, 0)

    expect(a.x).toBe(2.3)
    expect(a.y).toBe(-2.2)
    expect(a.z).toBe(2.1)
    expect(a.w).toBe(0)
    expect(a.w).toEqual(PointOrVector.VECTOR)
    expect(a.w).not.toEqual(PointOrVector.POINT)
  })

  it('point() creates tuples with w=1', () => {
    const p = point(4, -4, 3)
    const t = tuple(4, -4, 3, 1)
    expect(p).toEqual(t)
  })

  it('vector() creates tuples with w=0', () => {
    const p = vector(4, -4, 3)
    const v = tuple(4, -4, 3, 0)
    expect(p).toEqual(v)
  })
})
