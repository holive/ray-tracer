import { StripePattern } from '../patterns/StripePattern'
import { BLACK, Point, WHITE } from '../tuples'

describe('Patterns', () => {
  it('should create a stripe pattern', () => {
    const { a, b } = new StripePattern(WHITE, BLACK)
    expect(a).toEqual(WHITE)
    expect(b).toEqual(BLACK)
  })

  it('should check if a stripe pattern is constant in y', () => {
    const pattern = new StripePattern(WHITE, BLACK)
    expect(pattern.stripeAt(new Point(0, 0, 0))).toEqual(WHITE)
    expect(pattern.stripeAt(new Point(0, 1, 0))).toEqual(WHITE)
    expect(pattern.stripeAt(new Point(0, 2, 0))).toEqual(WHITE)
  })

  it('should check if a stripe pattern is constant in z', () => {
    const pattern = new StripePattern(WHITE, BLACK)
    expect(pattern.stripeAt(new Point(0, 0, 0))).toEqual(WHITE)
    expect(pattern.stripeAt(new Point(0, 0, 1))).toEqual(WHITE)
    expect(pattern.stripeAt(new Point(0, 0, 2))).toEqual(WHITE)
  })

  it('should check if a stripe pattern alternates in x', () => {
    const pattern = new StripePattern(WHITE, BLACK)
    expect(pattern.stripeAt(new Point(0, 0, 0))).toEqual(WHITE)
    expect(pattern.stripeAt(new Point(0.9, 0, 0))).toEqual(WHITE)
    expect(pattern.stripeAt(new Point(1, 0, 0))).toEqual(BLACK)
    expect(pattern.stripeAt(new Point(-0.1, 0, 0))).toEqual(BLACK)
    expect(pattern.stripeAt(new Point(-1, 0, 0))).toEqual(BLACK)
    expect(pattern.stripeAt(new Point(-1.1, 0, 0))).toEqual(WHITE)
  })
})
