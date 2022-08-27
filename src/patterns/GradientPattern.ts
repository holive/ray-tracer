import { Mixin } from 'ts-mixer'
import { Pattern } from './Pattern'
import { TestPattern } from './TestPattern'
import { Color, Point } from '../tuples'

export class GradientPattern extends Mixin(Pattern, TestPattern) {
  patternAt({ x }: Point): Color {
    const distance = this.b.subtract(this.a)
    const fraction = x - Math.floor(x)
    return this.a.add(distance.multiplyByScalar(fraction))
  }
}
