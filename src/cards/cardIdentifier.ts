export default class CardIdentifier {

  public static official(id: number) {
    return new CardIdentifier('official', id);
  }

  public static satireGaming(id: number) {
    return new CardIdentifier('satire-gaming', id);
  }

  constructor(readonly origin: string, readonly id: number) {
  }

  public equals(other: CardIdentifier | void) {
    if (other === undefined) {
      return false;
    }
    return this.origin === other.origin && this.id == other.id;
  }

  public asString() {
    return `${this.origin}-${this.id}`;
  }

  public displayString() {
    if (this.origin === 'satire-gaming') {
      return `SG-${this.id}`;
    }
    return `${this.id}`;
  }
}