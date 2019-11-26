import { CardInDeck } from './CardInDeck';
import { DeckStats } from './DeckStats';

export class Deck {
  public stats: DeckStats;
  constructor (
    public cards: CardInDeck[],
  ) { }
}
