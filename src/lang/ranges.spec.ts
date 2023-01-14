import { range } from 'lang/ranges'

describe('ranges', () => {
  describe('range', () => {
    it('should translate size zero to empty array', () => {
      expect(range(0, 0)).toEqual([])
    })
    it('should translate size one to only the start element', () => {
      expect(range(0, 1)).toEqual([0])
      expect(range(5, 1)).toEqual([5])
    })
  })
})
