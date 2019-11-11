import { Card } from '../cards/card';
import * as _ from 'lodash';

export class Decks {
    decks: Deck[];
}

export class DeckFormat {
    name: string;
    isLegal: boolean;
}

export class Deck {
    id: number;
    name: string;
    cards: CardInDeck[];
    isCurrent: boolean;
    isActive: boolean;
    formats: DeckFormat[];

    commander: Card;
    manaBase: CardInDeck[];

    private updateDeck(): void {

        this.cards = [];
        this.cards.push(new CardInDeck(this.commander, 1, 0));
        _.concat(this.cards, this.manaBase);
    }

    public setCommander(c: Card): void {
        this.commander = c;
        this.updateDeck();
    }
}

export class CardInDeck {
    constructor(public card: Card, public quantity: number, public priority: number) {

    }
}
