import { Ray } from '../rays'
import { Color, Point, Vector } from '../tuples'
import { Sphere } from '../spheres'
import { IDENTITY_MATRIX, Matrix } from '../matrices'
import { degreesToRadians } from '../utils'
import { Material } from '../lights/Material'

describe('Spheres', () => {
  it('A ray intersects a sphere at two points', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = ray.intersect(sphere)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(4)
    expect(intersections[1].t).toBe(6)
  })

  it('should check if a ray intersects a sphere at a tangent', () => {
    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = ray.intersect(sphere)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(5)
    expect(intersections[1].t).toBe(5)
  })

  it('should check if a ray misses a sphere', () => {
    const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = ray.intersect(sphere)
    expect(intersections.length).toBe(0)
  })

  it('should check if a ray originates inside a sphere', () => {
    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = ray.intersect(sphere)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(-1)
    expect(intersections[1].t).toBe(1)
  })

  it('should check if a sphere is behind a ray', () => {
    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = ray.intersect(sphere)
    expect(intersections.length).toBe(2)
    expect(intersections[0].t).toBe(-6)
    expect(intersections[1].t).toBe(-4)
  })

  it('should check if Intersect sets the object on the intersection', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()
    const intersections = ray.intersect(sphere)
    expect(intersections.length).toBe(2)
    expect(intersections[0].object).toEqual(sphere)
    expect(intersections[1].object).toEqual(sphere)
  })

  it('should return the default sphere transformation', () => {
    const s = new Sphere()
    expect(s.getTransform()).toEqual(IDENTITY_MATRIX)
  })

  it('should replace the default sphere transformation', () => {
    const s = new Sphere()
    const matrix = Matrix.translation(2, 3, 4)
    s.setTransform(matrix)
    expect(s.getTransform()).toEqual(matrix)
  })

  it('should replace the default sphere transformation', () => {
    const s = new Sphere()
    const matrix = Matrix.translation(2, 3, 4)
    s.setTransform(matrix)
    expect(s.getTransform()).toEqual(matrix)
  })

  it('should intersect a scaled sphere with a ray', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const s = new Sphere()
    s.setTransform(Matrix.scaling(2, 2, 2))
    const xs = r.intersect(s)
    expect(xs.length).toBe(2)
    expect(xs[0].t).toBe(3)
    expect(xs[1].t).toBe(7)
  })

  it('should intersect a translated sphere with a ray', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const s = new Sphere()
    s.setTransform(Matrix.translation(5, 0, 0))
    const xs = r.intersect(s)
    expect(xs.length).toBe(0)
  })

  it('should return the normal on a sphere at a point on the x axis', () => {
    const s = new Sphere()
    const n = s.normalAt(new Point(1, 0, 0))
    expect(n).toEqual(new Vector(1, 0, 0))
  })

  it('should return the normal on a sphere at a point on the y axis', () => {
    const s = new Sphere()
    const n = s.normalAt(new Point(0, 1, 0))
    expect(n).toEqual(new Vector(0, 1, 0))
  })

  it('should return the normal on a sphere at a point on the z axis', () => {
    const s = new Sphere()
    const n = s.normalAt(new Point(0, 0, 1))
    expect(n).toEqual(new Vector(0, 0, 1))
  })

  it('should return the normal on a sphere at a non axial point', () => {
    const s = new Sphere()
    const n = s.normalAt(
      new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(n).toEqual(
      new Vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
  })

  it('should always return a normalized vector', () => {
    const s = new Sphere()
    const n = s.normalAt(
      new Point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
    )
    expect(n).toEqual(n.normalize())
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

  it('should have a default material', () => {
    const s = new Sphere()
    const m = s.material
    expect(m).toEqual(new Material())
  })

  it('should may be assigned a material', () => {
    const s = new Sphere()
    const m = new Material()
    m.ambient = 1
    s.material = m
    expect(s.material).toEqual(m)
  })
})
