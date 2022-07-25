import { World } from '../world'
import { DefaultWord } from '../world/DefaultWord'
import { PointLight } from '../lights'
import { Color, Point, Vector } from '../tuples'
import { Ray } from '../rays'

describe('World', () => {
  it('Creates a world', () => {
    const w = new World()
    expect(w.light).toBeUndefined()
    expect(w.objects.length).toBe(0)
  })

  it('creates the default world', () => {
    const w = new DefaultWord()
    expect(w.light).toEqual(
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
})
