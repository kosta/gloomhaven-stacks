import { unique } from "lang/arrays";

describe('arrays', () => {
  describe('unique', () => {
    it('return empty array as is', () => {
      expect(unique([])).toEqual([]);
    });
    it('removes duplicate entries', () => {
      expect(unique([1, 1, 1, 1])).toEqual([1]);
    });
    it('return array without duplicates as is', () => {
      expect(unique([1,2,3])).toEqual([1,2,3]);
    });
  });
});