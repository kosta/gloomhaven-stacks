import CardIdentifier from "../../src/cards/cardIdentifier";

describe('card identifier', () => {

  describe('equals', () => {
    it('should equal if origin and id are the same', () => {
      const one = CardIdentifier.official(1);
      const two = CardIdentifier.official(1);

      expect(one.equals(two)).toBe(true);
    });
    it('should not equal if origin is different', () => {
      const one = CardIdentifier.official(1);
      const two = CardIdentifier.satireGaming(2);

      expect(one.equals(two)).toBe(false);
    });
    it('should not equal if origin is different', () => {
      const one = CardIdentifier.official(1);
      const two = CardIdentifier.satireGaming(1);

      expect(one.equals(two)).toBe(false);
    });
    it('should not equal undefined', () => {
      const two = CardIdentifier.official(3);
      expect(two.equals(undefined)).toBe(false);
    });
  });

  describe('asString', () => {
    expect(CardIdentifier.official(42).asString()).toEqual('official-42');
    expect(CardIdentifier.satireGaming(42).asString()).toEqual('satire-gaming-42');
  });

  describe('display string', () => {
    it('should be just the number for official cards', () => {
      expect(CardIdentifier.official(45).displayString()).toEqual('45')
    });
    it('should prefix satire gaming card ids with sg', () => {
      expect(CardIdentifier.satireGaming(7).displayString()).toEqual('SG-7');
    });
  });

});