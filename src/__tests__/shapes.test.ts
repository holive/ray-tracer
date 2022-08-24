import { BaseShape } from '../shapes'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { Material } from '../lights'
import { Point, Vector } from '../tuples'

describe('Shapes', () => {
  it('should check the default transformation', () => {
    const s = new BaseShape()
    expect(s.getTransform()).toEqual(IDENTITY_MATRIX)
  })

  it('should assign a transformation', () => {
    const s = new BaseShape()
    s.setTransform(Matrix.translation(2, 3, 4))
    expect(s.getTransform()).toEqual(Matrix.translation(2, 3, 4))
  })

  it('should check the default material', () => {
    const s = new BaseShape()
    const m = s.material
    expect(m).toEqual(new Material())
  })

  it('should assign a material', () => {
    const s = new BaseShape()
    const m = new Material()
    m.ambient = 1
    s.material = m
    expect(s.material).toEqual(m)
  })

  it('should compute the normal on a translated shape', () => {
    const s = new BaseShape()
    s.setTransform(Matrix.translation(0, 1, 0))
    const n = s.normalAt(new Point(0, 1.70711, -0.70711))
    expect(n.toFixed()).toEqual(new Vector(0, 0.70711, -0.70711))
  })

  it('should compute the normal on a transformed shape', () => {
    const s = new BaseShape()
    const m = new Matrix(Matrix.scaling(1, 0.5, 1)).multiply(
      Matrix.rotationZ(Math.PI / 5)
    )
    s.setTransform(m)
    const n = s.normalAt(new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))
    expect(n.toFixed()).toEqual(new Vector(0, 0.97014, -0.24254))
  })
})
