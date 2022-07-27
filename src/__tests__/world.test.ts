import { World } from '../world'
import { DefaultWord } from '../world/DefaultWord'
import { PointLight } from '../lights'
import { BLACK, Color, Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Intersection } from '../intersections'

describe('World', () => {
  it('Creates a world', () => {
    const w = new World()
    expect(w.lights).toBeUndefined()
    expect(w.objects.length).toBe(0)
  })

  it('creates the default world', () => {
    const w = new DefaultWord()
    expect(w.lights).toEqual(
      new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1))
    )
    expect(w.objects[0].material.color).toEqual(new Color(0.8, 1.0, 0.6))
    expect(w.objects[0].material.diffuse).toBe(0.7)
    expect(w.objects[0].material.specular).toBe(0.2)
    expect(w.objects[1].getTransform()).toEqual([
      [0.5, 0, 0, 0],
      [0, 0.5, 0, 0],
      [0, 0, 0.5, 0],
      [0, 0, 0, 1]
    ])
  })

  it('Intersects a world with a ray', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const xs = w.intersect(r)
    expect(xs.length).toBe(4)
    expect(xs[0].t).toBe(4)
    expect(xs[1].t).toBe(4.5)
    expect(xs[2].t).toBe(5.5)
    expect(xs[3].t).toBe(6)
  })

  it('should shade an intersection', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const shape = w.objects[0]
    const i = new Intersection(4, shape)
    const comps = i.prepareComputations(r)
    const c = w.shadeHit(comps)
    expect(c).toEqual(
      new Color(0.38066119308103435, 0.47582649135129296, 0.28549589481077575)
    )
  })

  it('should shade an intersection from the inside', () => {
    const w = new DefaultWord()
    w.lights = [new PointLight(new Point(0, 0.25, 0), new Color(1, 1, 1))]
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const shape = w.objects[1]
    const comps = new Intersection(0.5, shape).prepareComputations(r)
    const c = w.shadeHit(comps)
    expect(c).toEqual(
      new Color(0.9049844720833727, 0.9049844720833727, 0.9049844720833727)
    )
  })

  it('should return black if a ray misses', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 1, 0))
    const c = w.colorAt(r)
    expect(c).toEqual(BLACK)
  })

  it('should return black if a ray hits', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const c = w.colorAt(r)
    expect(c).toEqual(
      new Color(0.38066119308103435, 0.47582649135129296, 0.28549589481077575)
    )
  })
})
