import { Point, Vector } from '../tuples'
import { viewTransform } from '../transformations'
import { IDENTITY_MATRIX, Matrix } from '../matrices'

describe('Transformations', () => {
  it('checks the transformation matrix for the default orientation', () => {
    const from = new Point(0, 0, 0)
    const to = new Point(0, 0, -1)
    const up = new Vector(0, 1, 0)
    const t = viewTransform(from, to, up)
    expect(t).toEqual(IDENTITY_MATRIX)
  })

  it('checks a view transformation matrix looking in positive z direction', () => {
    const from = new Point(0, 0, 0)
    const to = new Point(0, 0, 1)
    const up = new Vector(0, 1, 0)
    const t = viewTransform(from, to, up)
    expect(t).toEqual(Matrix.scaling(-1, 1, -1))
  })

  it('assures the transformation moves the world and not the camera', () => {
    const from = new Point(0, 0, 8)
    const to = new Point(0, 0, 0)
    const up = new Vector(0, 1, 0)
    const t = viewTransform(from, to, up)
    expect(t).toEqual(Matrix.translation(0, 0, -8))
  })

  it('does an arbitrary view transformation', () => {
    const from = new Point(1, 3, 2)
    const to = new Point(4, -2, 8)
    const up = new Vector(1, 1, 0)
    const t = viewTransform(from, to, up)
    expect(t).toEqual([
      [
        -0.5070925528371099, 0.5070925528371099, 0.6761234037828132,
        -2.366431913239846
      ],
      [
        0.7677159338596801, 0.6060915267313263, 0.12121830534626524,
        -2.8284271247461894
      ],
      [-0.35856858280031806, 0.5976143046671968, -0.7171371656006361, 0],
      [0, 0, 0, 1]
    ])
  })
})
