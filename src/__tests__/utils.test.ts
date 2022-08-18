import * as utils from '../utils'

describe('utils', () => {
  it('should compare floats', () => {
    expect(utils.compareFloat(1000000.1 + 0.2, 1000000.3)).toBeFalsy()
    expect(utils.compareFloat(1000000.1 + 0.2, 1000000.3)).toBeTruthy()
  })

  it('should return the square of a number', () => {
    expect(utils.pow2(13)).toBe(169)
  })
})
