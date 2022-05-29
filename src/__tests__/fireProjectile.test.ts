import { Point, Vector } from '../tuples'

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
  counter = 1
): undefined => {
  const newPosition = position.add(velocity)
  const newVelocity = velocity.add(gravity).add(wind) as Vector

  if (position.y > 0) {
    return tick(
      { wind, gravity },
      { position: newPosition, velocity: newVelocity },
      counter + 1
    )
  }

  console.log(`Took ${counter} steps to hit the ground.`)
}

describe('Fire Projectile', () => {
  it('executes tick()', () => {
    const e: Environment = {
      gravity: new Vector(0, -0.1, 0),
      wind: new Vector(-0.01, 0, 0)
    }
    const p: Projectile = {
      position: new Point(0, 1, 1),
      velocity: new Vector(1, 1, 0).normalize()
    }

    tick(e, p)
  })
})
