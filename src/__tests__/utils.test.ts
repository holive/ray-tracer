import * as utils from '../utils'

describe('utils', () => {
  it('equal', () => {
    expect(
      utils.compareFloat(1000000.1 + 0.2, 1000000.3, Number.EPSILON)
    ).toBeFalsy()
    expect(utils.compareFloat(1000000.1 + 0.2, 1000000.3)).toBeTruthy()
  })
})
