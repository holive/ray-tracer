import { Mixin } from 'ts-mixer'
import { Pattern } from './Pattern'
import { TestPattern } from './TestPattern'
import { Color, Point } from '../tuples'

export class RingPattern extends Mixin(Pattern, TestPattern) {
  color(p: Point, Ca: Color, Cb: Color): Color {
    if (Math.floor(Math.sqrt(p.x ** 2 + p.z ** 2)) % 2 == 0) {
      return Ca
    }
    return Cb
  }

  patternAt(p: Point): Color {
    return this.color(p, this.a, this.b)
  }
}
