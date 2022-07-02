import { Sphere } from '../spheres'
import { Intersection } from '../intersections'

describe('Intersections', () => {
  it('should encapsulate t and object in an intersection', () => {
    const s = new Sphere('9sdf')
    const i = new Intersection(3.5, s)
    expect(i.t).toBe(3.5)
    expect(i.object).toEqual(s)
  })

  it('should aggregate intersections', () => {
    const s = new Sphere('9sdf')
    const i1 = new Intersection(1, s)
    const i2 = new Intersection(2, s)
    const xs = Intersection.intersections(i1, i2)
    expect(xs.length).toBe(2)
    expect(xs[0].t).toBe(1)
    expect(xs[1].t).toBe(2)
  })
})
