import { Pattern } from './Pattern'
import { TestPattern } from './TestPattern'
import { Mixin } from 'ts-mixer'
import { Color, Point } from '../tuples'

export class CheckersPattern extends Mixin(Pattern, TestPattern) {
  patternAt({ x, y, z }: Point): Color {
    if ((Math.floor(x) + Math.floor(y) + Math.floor(z)) % 2 == 0) {
      return this.a
    }
    return this.b
  }
}
