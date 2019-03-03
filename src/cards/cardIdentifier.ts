export default class CardIdentifier {

  public static offical(id: number) {
    return new CardIdentifier('official', id);
  }

  public static satireGaming(id: number) {
    return new CardIdentifier('satire gaming', id);
  }

  constructor(private origin: string, private id: number) {
  }

  public equals(other: CardIdentifier) {
    return this.origin === other.origin && this.id == other.id;
  }
}