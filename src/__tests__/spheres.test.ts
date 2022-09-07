import { Ray } from '../rays'
import { Point, Vector } from '../tuples'
import { Sphere } from '../spheres'
import { IDENTITY_MATRIX, Matrix, RANDOM_MATRIX } from '../matrices'
import { degreesToRadians } from '../utils'
import { Material } from '../lights'
import { BaseShape } from '../shapes'

describe('Spheres', () => {
  it('A ray intersects a sphere at two points', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = sphere.localIntersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(4)
    expect(intersections[1].t).toBe(6)
  })

  it('should check if a ray intersects a sphere at a tangent', () => {
    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = sphere.localIntersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(5)
    expect(intersections[1].t).toBe(5)
  })

  it('should check if a ray misses a sphere', () => {
    const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = sphere.localIntersect(ray)
    expect(intersections.length).toBe(0)
  })

  it('should check if a ray originates inside a sphere', () => {
    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = sphere.localIntersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(-1)
    expect(intersections[1].t).toBe(1)
  })

  it('should check if a sphere is behind a ray', () => {
    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = sphere.localIntersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(-6)
    expect(intersections[1].t).toBe(-4)
  })

  it('should check if Intersect sets the object on the intersection', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = sphere.localIntersect(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0].object).toEqual(sphere)
    expect(intersections[1].object).toEqual(sphere)
  })

  it('should intersect a scaled sphere with a ray', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const s = new BaseShape()
    s.setTransform(Matrix.scaling(2, 2, 2))
    s.intersect(r)
    expect(s.savedRay.origin).toEqual(new Point(0, 0, -2.5))
    expect(s.savedRay.direction).toEqual(new Vector(0, 0, 0.5))
  })

  it('should intersect a translated sphere with a ray', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const s = new BaseShape()
    s.setTransform(Matrix.translation(5, 0, 0))
    s.intersect(r)
    expect(s.savedRay.origin).toEqual(new Point(-5, 0, -5))
    expect(s.savedRay.direction).toEqual(new Vector(0, 0, 1))
  })

  it('should return the normal on a sphere at a point on the x axis', () => {
    const s = new Sphere()
    const n = s.localNormalAt(new Point(1, 0, 0))
    expect(n).toEqual(new Vector(1, 0, 0))
  })

  it('should return the normal on a sphere at a point on the y axis', () => {
    const s = new Sphere()
    const n = s.localNormalAt(new Point(0, 1, 0))
    expect(n).toEqual(new Vector(0, 1, 0))
  })

  it('should return the normal on a sphere at a point on the z axis', () => {
    const s = new Sphere()
    const n = s.localNormalAt(new Point(0, 0, 1))
    expect(n).toEqual(new Vector(0, 0, 1))
  })

  it('should return the normal on a sphere at a non axial point', () => {
    const s = new Sphere()
    const n = s.localNormalAt(
      new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(n).toEqual(
      new Vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
  })

  it('should always return a normalized vector', () => {
    const s = new Sphere()
    const n = s.localNormalAt(
      new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(n).toEqual(n.normalize())
  })

  it('checks if a Sphere is a Shape', () => {
    const s = new Sphere()
    s.setTransform(RANDOM_MATRIX)
    expect(s.getTransform()).toEqual(RANDOM_MATRIX)

    // should have intersect()
    s.setTransform(Matrix.translation(5, 0, 0))
    expect(
      s.intersect(new Ray(new Point(0, 0, -5), new Vector(0, 0, 1)))
    ).toEqual([])

    expect(s.material).toEqual(new Material())
    expect(s.position).toEqual(new Point(0, 0, 0))
  })

  it('should have a helper for producting a sphere with a glassy material', () => {
    const s = Sphere.glassSphere()
    expect(s.getTransform()).toEqual(IDENTITY_MATRIX)
    expect(s.material.transparency).toBe(1)
    expect(s.material.refractiveIndex).toBe(1.5)
  })
})

describe('Sphere - transforming normals', () => {
  it('should compute the normal on a translated sphere', () => {
    const s = new Sphere()
    s.setTransform(Matrix.translation(0, 1, 0))
    const n = s.normalAt(new Point(0, 1.70711, -0.70711))
    expect(n).toEqual(new Vector(0, 0.7071067811865476, -0.7071067811865476))
  })

  it('should compute the normal on a transformed sphere', () => {
    const s = new Sphere()
    const m = new Matrix(Matrix.scaling(1, 0.5, 1)).multiply(
      Matrix.rotationZ(degreesToRadians(180 / 5))
    )
    s.setTransform(m)

    const n = s.normalAt(new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))
    expect(n).toEqual(new Vector(0, 0.970141693080727, -0.24253885327192506))
  })
})
