import { BaseShape } from '../shapes'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { Material } from '../lights'
import { Point, Vector } from '../tuples'
import { Group } from '../groups'
import { Sphere } from '../spheres'

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

  it('should convert a point from world to object space', () => {
    const g1 = new Group()
    g1.setTransform(Matrix.rotationY(Math.PI / 2))
    const g2 = new Group()
    g2.setTransform(Matrix.scaling(2, 2, 2))
    g1.addChild(g2)
    const s = new Sphere()
    s.setTransform(Matrix.translation(5, 0, 0))
    g2.addChild(s)
    const p = s.worldToObject(new Point(-2, 0, -10))
    expect(p).toEqual(new Point(0, 0, -1))
  })

  it('converts a normal from object to world space', () => {
    const g1 = new Group()
    g1.setTransform(Matrix.rotationY(Math.PI / 2))
    const g2 = new Group()
    g2.setTransform(Matrix.scaling(1, 2, 3))
    g1.addChild(g2)
    const s = new Sphere()
    s.setTransform(Matrix.translation(5, 0, 0))
    g2.addChild(s)
    const n = s.normalToWorld(
      new Vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(n.toFixed(4)).toEqual(new Vector(0.2857, 0.4286, -0.8571))
  })

  it('finds the normal on a child object', () => {
    const g1 = new Group()
    g1.setTransform(Matrix.rotationY(Math.PI / 2))
    const g2 = new Group()
    g2.setTransform(Matrix.scaling(1, 2, 3))
    g1.addChild(g2)
    const s = new Sphere()
    s.setTransform(Matrix.translation(5, 0, 0))
    g2.addChild(s)
    const n = s.normalAt(new Point(1.7321, 1.1547, -5.5774))
    expect(n.toFixed(4)).toEqual(new Vector(0.2857, 0.4285, -0.8572))
  })

  it('checks if base shape has (arbitrary) bounds', () => {
    const shape = new BaseShape()
    const box = shape.boundsOf()
    expect(box.min).toEqual(new Point(-1, -1, -1))
    expect(box.max).toEqual(new Point(1, 1, 1))
  })
})
