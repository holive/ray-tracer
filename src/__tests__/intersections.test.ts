import { Sphere } from '../spheres'
import { Intersection } from '../intersections'
import { Ray } from '../rays'
import { Point, Vector } from '../tuples'
import { Matrix } from '../matrices'
import { EPSILON } from '../utils'

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

  it('should compute the hit when an intersection occurs on the outside', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const shape = new Sphere()
    const i = new Intersection(4, shape)
    const comps = i.prepareComputations(r)
    expect(comps.inside).toBeFalsy()
  })

  it('should compute the hit when an intersection occurs on the inside', () => {
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const shape = new Sphere()
    const i = new Intersection(1, shape)
    const comps = i.prepareComputations(r)
    expect(comps.point).toEqual(new Point(0, 0, 1))
    expect(comps.eyeV).toEqual(new Vector(0, 0, -1))
    expect(comps.inside).toBeTruthy()
    // normal would have been (0,0,1), but is inverted!
    expect(comps.normalV).toEqual(new Vector(0, 0, -1))
  })

  it(', the hit, should offset the point', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const shape = new Sphere()
    shape.setTransform(Matrix.translation(0, 0, 1))
    const i = new Intersection(5, shape)
    const comps = i.prepareComputations(r)
    expect(comps.overPoint.z < -EPSILON / 2).toBeTruthy()
    expect(comps.point.z > comps.overPoint.z).toBeTruthy()
  })

  it('should find n1 and n2 at various intersections', () => {
    const A = Sphere.glassSphere()
    A.setTransform(Matrix.scaling(2, 2, 2))
    A.material.refractiveIndex = 1.5

    const B = Sphere.glassSphere()
    B.setTransform(Matrix.translation(0, 0, -0.25))
    B.material.refractiveIndex = 2

    const C = Sphere.glassSphere()
    C.setTransform(Matrix.translation(0, 0, 0.25))
    C.material.refractiveIndex = 2.5

    const r = new Ray(new Point(0, 0, -4), new Vector(0, 0, 1))
    const xs = Intersection.intersections(
      new Intersection(2, A),
      new Intersection(2.75, B),
      new Intersection(3.25, C),
      new Intersection(4.75, B),
      new Intersection(5.25, C),
      new Intersection(6, A)
    )

    const reference: { n1: number; n2: number }[] = [
      { n1: 1, n2: 1.5 },
      { n1: 1.5, n2: 2 },
      { n1: 2, n2: 2.5 },
      { n1: 2.5, n2: 2.5 },
      { n1: 2.5, n2: 1.5 },
      { n1: 1.5, n2: 1 }
    ]

    xs.forEach((intersection, index) => {
      const comps = intersection.prepareComputations(r, xs)
      expect(comps.n1).toBe(reference[index].n1)
      expect(comps.n2).toBe(reference[index].n2)
    })
  })

  it('checks if the under point is offset below the surface', () => {
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const shape = Sphere.glassSphere()
    shape.setTransform(Matrix.translation(0, 0, 1))
    const i = new Intersection(5, shape)
    const xs = Intersection.intersections(i)
    const comps = i.prepareComputations(r, xs)
    expect(comps.underPoint.z > EPSILON / 2).toBeTruthy()
    expect(comps.point.z < comps.underPoint.z).toBeTruthy()
  })
})
