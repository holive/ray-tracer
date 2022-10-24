import { Group } from '../groups'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { BaseShape } from '../shapes'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'
import { Sphere } from '../spheres'
import { Cylinder } from '../cylinders/cylinder'

describe('Groups', () => {
  it('creates a new group', () => {
    const g = new Group()
    expect(g.getTransform()).toEqual(IDENTITY_MATRIX)
    expect(g.children.length).toBe(0)
  })

  it('checks if a shape has a parent attribute', () => {
    const s = new BaseShape()
    expect(s.parent).toBeUndefined()
  })

  it('should add a child to a group', () => {
    const g = new Group()
    const s = new BaseShape()
    g.addChild(s)
    expect(g.children.length).toBe(1)
    expect(g.children[0]).toEqual(s)
    expect(s.parent).toEqual(g)
  })

  it('should intersect a ray with an empty group', () => {
    const g = new Group()
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const xs = g.localIntersect(r)
    expect(xs.length).toBe(0)
  })

  it('should intersect a ray with a nonempty group', () => {
    const g = new Group()
    const s1 = new Sphere()
    const s2 = new Sphere()
    s2.setTransform(Matrix.translation(0, 0, -3))
    const s3 = new Sphere()
    s3.setTransform(Matrix.translation(5, 0, 0))
    g.addChild(s1)
    g.addChild(s2)
    g.addChild(s3)

    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const xs = g.localIntersect(r)

    expect(xs.length).toBe(4)
    expect(xs[0].object).toEqual(s2)
    expect(xs[1].object).toEqual(s2)
    expect(xs[2].object).toEqual(s1)
    expect(xs[3].object).toEqual(s1)
  })

  it('should intersect a transformed group', () => {
    const g = new Group()
    g.setTransform(Matrix.scaling(2, 2, 2))
    const s = new Sphere()
    s.setTransform(Matrix.translation(5, 0, 0))
    g.addChild(s)
    const r = new Ray(new Point(10, 0, -10), new Vector(0, 0, 1))
    const xs = g.intersect(r)
    expect(xs.length).toBe(2)
  })

  it('checks if a group has a bounding box that contains its children', () => {
    const s = new Sphere()
    s.setTransform(
      Matrix.translationC(2, 5, -3).multiply(Matrix.scaling(2, 2, 2))
    )

    const c = new Cylinder(-2, 2)
    c.setTransform(
      Matrix.translationC(-4, -1, 4).multiply(Matrix.scaling(0.5, 1, 0.5))
    )

    const shape = new Group()
    shape.addChild(s)
    shape.addChild(c)
    const box = shape.boundsOf()
    expect(box.min).toEqual(new Point(-4.5, -3, -5))
    expect(box.max).toEqual(new Point(4, 7, 4.5))
  })

  it(
    "checks if intersection ray+group doesn't test children if box is" +
      ' missed',
    () => {
      const child = new BaseShape()
      const shape = new Group()
      shape.addChild(child)
      const r = new Ray(new Point(0, 0, -5), new Vector(0, 1, 0))
      const xs = shape.intersect(r)
      expect(child.savedRay).toEqual(
        new Ray(new Point(0, 0, 0), new Vector(0, 0, 0))
      )
    }
  )

  it('checks if intersection ray+group tests children if box is hit', () => {
    const child = new BaseShape()
    const shape = new Group()
    shape.addChild(child)
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const xs = shape.intersect(r)
    expect(child.savedRay).not.toEqual(
      new Ray(new Point(0, 0, 0), new Vector(0, 0, 0))
    )
  })
})
