import { World } from '../world'
import { DefaultWord } from '../world/DefaultWord'
import { PointLight } from '../lights'
import { BLACK, Color, Point, Vector } from '../tuples'
import { Ray } from '../rays'
import { Intersection } from '../intersections'
import { Sphere } from '../spheres'
import { Matrix } from '../matrices'
import { Plane } from '../plane'

describe('World', () => {
  it('Creates a world', () => {
    const w = new World()
    expect(w.lights?.length).toBe(0)
    expect(w.objects.length).toBe(0)
  })

  it('creates the default world', () => {
    const w = new DefaultWord()
    expect(w.lights).toEqual([
      new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1))
    ])
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
      new Color(0.9049844720832575, 0.9049844720832575, 0.9049844720832575)
    )
  })

  it('should return black if a ray misses', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 1, 0))
    const c = w.colorAt(r, 5)
    expect(c).toEqual(BLACK)
  })

  it('should return black if a ray hits', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const c = w.colorAt(r, 5)
    expect(c).toEqual(
      new Color(0.38066119308103435, 0.47582649135129296, 0.28549589481077575)
    )
  })

  it('should return the color with an intersection behind the ray', () => {
    const w = new DefaultWord()
    const outer = w.objects[0]
    outer.material.ambient = 1
    const inner = w.objects[1]
    inner.material.ambient = 1
    const r = new Ray(new Point(0, 0, 0.75), new Vector(0, 0, -1))

    const c = w.colorAt(r, 5)
    expect(c).toEqual(inner.material.color)
  })

  it('should not have shadow when nothing is collinear with point and light', () => {
    const w = new DefaultWord()
    const p = new Point(0, 10, 0)
    expect(w.isShadowed(p)).toBeFalsy()
  })

  it('should check the shadow when an object is between the point and the light', () => {
    const w = new DefaultWord()
    const p = new Point(10, -10, 10)
    expect(w.isShadowed(p)).toBeTruthy()
  })

  it('should have no shadow when an object is behind the light', () => {
    const w = new DefaultWord()
    const p = new Point(-20, 20, -20)
    expect(w.isShadowed(p)).toBeFalsy()
  })

  it('should have no shadow when an object is behind the point', () => {
    const w = new DefaultWord()
    const p = new Point(-2, 2, -2)
    expect(w.isShadowed(p)).toBeFalsy()
  })

  it('should call shadeHit() with an intersection in shadow', () => {
    const w = new World()
    w.lights = [new PointLight(new Point(0, 0, -10), new Color(1, 1, 1))]
    const s1 = new Sphere()
    w.objects.push(s1)
    const s2 = new Sphere()
    s2.setTransform(Matrix.translation(0, 0, 10))
    w.objects.push(s2)
    const r = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const i = new Intersection(4, s2)
    const comps = i.prepareComputations(r)
    const c = w.shadeHit(comps)
    expect(c).toEqual(new Color(0.1, 0.1, 0.1))
  })

  it('checks for the reflected color for a nonreflective material', () => {
    const w = new DefaultWord()
    const r = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const shape = w.objects[1]
    shape.material.ambient = 1
    const i = new Intersection(1, shape)
    const comps = i.prepareComputations(r)
    const color = w.reflectedColor(comps, 5)
    expect(color).toEqual(new Color(0, 0, 0))
  })

  it('checks the reflected color for a reflective material', () => {
    const w = new DefaultWord()
    const shape = new Plane()
    shape.material.reflective = 0.5
    shape.setTransform(Matrix.translation(0, -1, 0))
    w.objects.push(shape)
    const r = new Ray(
      new Point(0, 0, -3),
      new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )
    const i = new Intersection(Math.sqrt(2), shape)
    const comps = i.prepareComputations(r)
    const color = w.reflectedColor(comps, 5)
    expect(color.toFixed()).toEqual(new Color(0.19034, 0.23792, 0.14275))
  })

  it('checks shadeHit() with a reflective material', () => {
    const w = new DefaultWord()
    const shape = new Plane()
    shape.material.reflective = 0.5
    shape.setTransform(Matrix.translation(0, -1, 0))
    w.objects.push(shape)

    const r = new Ray(
      new Point(0, 0, -3),
      new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )
    const i = new Intersection(Math.sqrt(2), shape)
    const comps = i.prepareComputations(r)
    const color = w.shadeHit(comps)

    expect(color.toFixed()).toEqual(new Color(0.87676, 0.92435, 0.82918))
  })

  it('checks the reflected color at the maximum recursive depth', () => {
    const w = new DefaultWord()
    const shape = new Plane()
    shape.material.reflective = 0.5
    shape.setTransform(Matrix.translation(0, -1, 0))
    w.objects.push(shape)
    const r = new Ray(
      new Point(0, 0, -3),
      new Vector(0, -Math.sqrt(2) / 2, Math.sqrt(2) / 2)
    )
    const i = new Intersection(Math.sqrt(2), shape)
    const comps = i.prepareComputations(r)
    const color = w.reflectedColor(comps, 0)
    expect(color.toFixed()).toEqual(new Color(0, 0, 0))
  })
})
