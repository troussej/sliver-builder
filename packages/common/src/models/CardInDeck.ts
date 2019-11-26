import { Card } from 'scryfall-sdk';
export class CardInDeck {
  constructor (
    public card: Card,
    public quantity: number,
    public priority: number,
  ) { }
}
