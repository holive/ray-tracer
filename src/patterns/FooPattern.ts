import { Pattern } from './Pattern'
import { TestPattern } from './TestPattern'
import { Mixin } from 'ts-mixer'
import { Color, Point } from '../tuples'

export class FooPattern extends Mixin(Pattern, TestPattern) {
  patternAt({ x, y, z }: Point): Color {
    return new Color(x, y, z)
  }
}
