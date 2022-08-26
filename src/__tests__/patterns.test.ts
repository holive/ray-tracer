import { StripePattern } from '../patterns/StripePattern'
import { BLACK, Color, Point, WHITE } from '../tuples'
import { TestPattern } from '../patterns/TestPattern'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { Sphere } from '../spheres'

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

  it('should the default pattern transformation', () => {
    const pattern = new TestPattern()
    expect(pattern.transform).toEqual(IDENTITY_MATRIX)
  })

  it('should assign a transformation', () => {
    const pattern = new TestPattern()
    pattern.setPatternTransform(Matrix.translation(1, 2, 3))
    expect(pattern.transform).toEqual(Matrix.translation(1, 2, 3))
  })

  it('should check the pattern with an object transformation', () => {
    const shape = new Sphere()
    shape.setTransform(Matrix.scaling(2, 2, 2))
    const pattern = new TestPattern()
    const c = pattern.patternAtShape(shape, new Point(2, 3, 4))
    expect(c).toEqual(new Color(1, 1.5, 2))
  })

  it('should check the pattern with an pattern transformation', () => {
    const shape = new Sphere()
    const pattern = new TestPattern()
    pattern.setPatternTransform(Matrix.scaling(2, 2, 2))
    const c = pattern.patternAtShape(shape, new Point(2, 3, 4))
    expect(c).toEqual(new Color(1, 1.5, 2))
  })

  it('should check a pattern with both an object and a pattern transformation', () => {
    const shape = new Sphere()
    shape.setTransform(Matrix.scaling(2, 2, 2))
    const pattern = new TestPattern()
    pattern.setPatternTransform(Matrix.translation(0.5, 1, 1.5))
    const c = pattern.patternAtShape(shape, new Point(2.5, 3, 3.5))
    expect(c).toEqual(new Color(0.75, 0.5, 0.25))
  })
})
