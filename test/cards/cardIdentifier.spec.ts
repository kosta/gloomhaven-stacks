import CardIdentifier from "../../src/cards/cardIdentifier";

describe('card identifier', () => {
  it('should equal if origin and id are the same', () => {
    const one = CardIdentifier.offical(1);
    const two = CardIdentifier.offical(1);

    expect(one.equals(two)).toBe(true);
  });
  it('should not equal if origin is different', () => {
    const one = CardIdentifier.offical(1);
    const two = CardIdentifier.satireGaming(2);

    expect(one.equals(two)).toBe(false);
  });
  it('should not equal if origin is different', () => {
    const one = CardIdentifier.offical(1);
    const two = CardIdentifier.satireGaming(1);

    expect(one.equals(two)).toBe(false);
  });
});