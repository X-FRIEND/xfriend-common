import http from '../../src/http'

describe('http', () => {
  it('should return "start"', () => {
    const result = http.start()

    expect(result).toBe('teste ok!')
  })
})
