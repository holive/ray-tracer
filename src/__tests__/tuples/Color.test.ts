import { Color } from '../../tuples'

describe('Color', () => {
  it('Colors are (red, green, blue) tuples', () => {
    const c = new Color(-0.5, 0.4, 1.7)
    expect(c.red).toBe(-0.5)
    expect(c.green).toBe(0.4)
    expect(c.blue).toBe(1.7)
  })

  it('Adding colors', () => {
    const c1 = new Color(0.9, 0.6, 0.75)
    const c2 = new Color(0.7, 0.1, 0.25)
    expect(c1.add(c2)).toEqual(new Color(1.6, 0.7, 1))
  })

  it('Subtracting colors', () => {
    const c1 = new Color(0.9, 0.6, 0.75)
    const c2 = new Color(0.7, 0.1, 0.25)
    expect(c1.subtract(c2)).toEqual(new Color(0.20000000000000007, 0.5, 0.5))
  })

  it('Multiplying a color by a scalar', () => {
    const c = new Color(0.2, 0.3, 0.4)
    expect(c.multiplyByScalar(2)).toEqual(new Color(0.4, 0.6, 0.8))
  })

  it('Multiplying a color by a color', () => {
    const c1 = new Color(1, 0.2, 0.4)
    const c2 = new Color(0.9, 1, 0.1)
    expect(c1.multiplyByColor(c2)).toEqual(
      new Color(0.9, 0.2, 0.04000000000000001)
    )
  })
})
