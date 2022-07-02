import { Ray } from '../Rays'
import { Point, Vector } from '../tuples'
import { Sphere } from '../Spheres'

describe('Spheres', () => {
  it('A ray intersects a sphere at two points', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere('2j3b4')
    const intersections = sphere.intersects(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBe(4)
    expect(intersections[1]).toBe(6)
  })

  it('should check if a ray intersects a sphere at a tangent', () => {
    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
    const sphere = new Sphere('323fsd')
    const intersections = sphere.intersects(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBe(5)
    expect(intersections[1]).toBe(5)
  })

  it('should check if a ray misses a sphere', () => {
    const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1))
    const sphere = new Sphere('asdf3')
    const intersections = sphere.intersects(ray)
    expect(intersections.length).toBe(0)
  })

  it('should check if a ray originates inside a sphere', () => {
    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const sphere = new Sphere('1234ad')
    const intersections = sphere.intersects(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBe(-1)
    expect(intersections[1]).toBe(1)
  })

  it('should check if a sphere is behind a ray', () => {
    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const sphere = new Sphere('32ewds')
    const intersections = sphere.intersects(ray)
    expect(intersections.length).toBe(2)
    expect(intersections[0]).toBe(-6)
    expect(intersections[1]).toBe(-4)
  })
})
