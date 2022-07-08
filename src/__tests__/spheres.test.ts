import { Ray } from '../rays'
import { Point, Vector } from '../tuples'
import { Sphere } from '../spheres'
import { IDENTITY_MATRIX, Matrix } from '../matrices'

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
})
