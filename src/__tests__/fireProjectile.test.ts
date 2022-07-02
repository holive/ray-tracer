import { Point, Tuple, Vector, WHITE } from '../tuples'
import { Canvas } from '../canvas'

type Projectile = {
  position: Point
  velocity: Vector
}

type Environment = {
  gravity: Vector
  wind: Vector
}

const tick = (
  { wind, gravity }: Environment,
  { position, velocity }: Projectile,
  counter = 1,
  results = Array<Tuple>()
): Tuple[] => {
  const newPosition = position.add(velocity)
  const newVelocity = velocity.add(gravity).add(wind) as Vector

  if (position.y > 0) {
    results.push(newPosition)

    return tick(
      { wind, gravity },
      { position: newPosition, velocity: newVelocity },
      counter + 1,
      results
    )
  }

  return results
}

describe('Fire Projectile', () => {
  it('executes tick()', () => {
    const width = 900
    const height = 550
    const e: Environment = {
      gravity: new Vector(0, -0.1, 0),
      wind: new Vector(-0.01, 0, 0)
    }
    const p: Projectile = {
      position: new Point(0, 1, 0),
      velocity: new Vector(100, 130.8, 0).normalize().multiply(9.9) as Vector
    }

    const result = tick(e, p)
    const c = new Canvas(width, height)

    result.forEach((position) => {
      const x = Math.round(position.x)
      const y = Math.round(position.y)

      if (y <= height && y >= 0 && x <= width && x >= 0) {
        c.writePixel(x, y, WHITE)
      }
    })

    c.toPPM()
  })
})
