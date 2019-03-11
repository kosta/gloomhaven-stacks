export default class CardIdentifier {

  public static official(cardNumber: number) {
    return new CardIdentifier('official', cardNumber);
  }

  public static satireGaming(cardNumber: number) {
    return new CardIdentifier('satire-gaming', cardNumber);
  }

  constructor(readonly origin: string, readonly cardNumber: number) {
  }

  public equals(other: CardIdentifier | void) {
    if (other === undefined) {
      return false;
    }
    return this.origin === other.origin && this.cardNumber == other.cardNumber;
  }

  public asString() {
    return `${this.origin}-${this.cardNumber}`;
  }

  public displayString() {
    if (this.origin === 'satire-gaming') {
      return `SG-${this.cardNumber}`;
    }
    return `${this.cardNumber}`;
  }
}