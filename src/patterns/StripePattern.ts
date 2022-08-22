import { Color, Point } from '../tuples'
import { Pattern } from './Pattern'

export class StripePattern extends Pattern {
  stripeAt(point: Point): Color {
    if (Math.floor(point.x) % 2 == 0) {
      return this.a
    }
    return this.b
  }
}
