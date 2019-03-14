export default class CardIdentifier {

  public static official(cardNumber: number) {
    return CardIdentifier.create('official', cardNumber);
  }

  public static satireGaming(cardNumber: number) {
    return CardIdentifier.create('satire-gaming', cardNumber);
  }

  static parseFrom(cardIdentifierAsString: string) {
    const split = cardIdentifierAsString.split('-');
    const cardNumber = parseInt(split.pop() as string, 10);
    const origin = split.join('-');
    return CardIdentifier.create(origin, cardNumber);
  }

  public static create(origin: string, cardNumber: number) {
    if (isNaN(cardNumber)) {
      throw new Error('number is NaN');
    }
    return new CardIdentifier(origin, cardNumber);
  }

  private constructor(readonly origin: string, readonly cardNumber: number) {
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