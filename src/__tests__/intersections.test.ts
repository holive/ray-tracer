import { Sphere } from '../spheres'
import { Intersection } from '../intersections'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'

describe('Intersections', () => {
  it('should encapsulate t and object in an intersection', () => {
    const s = new Sphere()
    const i = new Intersection(3.5, s)
    expect(i.t).toBe(3.5)
    expect(i.object).toEqual(s)
  })

  it('should aggregate intersections', () => {
    const s = new Sphere()
    const i1 = new Intersection(1, s)
    const i2 = new Intersection(2, s)
    const xs = Intersection.intersections(i1, i2)
    expect(xs.length).toBe(2)
    expect(xs[0].t).toBe(1)
    expect(xs[1].t).toBe(2)
  })

  it('The hit, when all intersections have positive t', () => {
    const s = new Sphere()
    const i1 = new Intersection(1, s)
    const i2 = new Intersection(2, s)
    const i3 = new Intersection(0, s)
    const xs = Intersection.intersections(i2, i3, i1)
    expect(Intersection.hit(xs)).toEqual(i3)
  })

  it('The hit, when some intersections have negative t', () => {
    const s = new Sphere()
    const i1 = new Intersection(-1, s)
    const i2 = new Intersection(1, s)
    const xs = Intersection.intersections(i2, i1)
    expect(Intersection.hit(xs)).toEqual(i2)
  })

  it('The hit, when all intersections have negative t', () => {
    const s = new Sphere()
    const i1 = new Intersection(-1, s)
    const i2 = new Intersection(-2, s)
    const xs = Intersection.intersections(i2, i1)
    expect(Intersection.hit(xs)).toBeNull()
  })

  it('The hit is always the lowest non negative intersection', () => {
    const s = new Sphere()
    const i1 = new Intersection(5, s)
    const i2 = new Intersection(7, s)
    const i3 = new Intersection(-3, s)
    const i4 = new Intersection(2, s)
    const xs = Intersection.intersections(i2, i1, i3, i4)
    expect(Intersection.hit(xs)).toEqual(i4)
  })

  it('Precomputes the state of an intersection', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const shape = new Sphere()
    const i = new Intersection(4, shape)
    const comps = i.prepareComputations(r)

    expect(comps.t).toBe(i.t)
    expect(comps.object).toBe(i.object)
    expect(comps.point).toEqual(new Point(0, 0, -1))
    expect(comps.eyeV).toEqual(new Vector(0, 0, -1))
    expect(comps.normalV).toEqual(new Vector(0, 0, -1))
  })
})
