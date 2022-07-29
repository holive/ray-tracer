import { Point, Vector } from '../tuples'
import { Matrix, MatrixTypeFour } from '../matrices'

export function viewTransform(
  from: Point,
  to: Point,
  up: Vector
): MatrixTypeFour {
  const f = to.subtract(from)
  const forward = new Vector(f.x, f.y, f.z).normalize()

  const upn = up.normalize()
  const left = forward.cross(upn)
  const trueUp = left.cross(forward)

  const orientation = new Matrix([
    [left.x, left.y, left.z, 0],
    [trueUp.x, trueUp.y, trueUp.z, 0],
    [-forward.x, -forward.y, -forward.z, 0],
    [0, 0, 0, 1]
  ])

  return orientation.multiply(Matrix.translation(-from.x, -from.y, -from.z))
}
