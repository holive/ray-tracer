import { Color, Point } from '../tuples'
import { Pattern } from './Pattern'
import { Mixin } from 'ts-mixer'
import { TestPattern } from './TestPattern'

export class StripePattern extends Mixin(Pattern, TestPattern) {
  stripeAt(point: Point): Color {
    if (Math.floor(point.x) % 2 == 0) {
      return this.a
    }
    return this.b
  }

  patternAt(point: Point): Color {
    return this.stripeAt(point)
  }
}
