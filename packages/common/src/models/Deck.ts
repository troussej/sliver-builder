import { Card, Color } from "scryfall-sdk";


export enum PackageSelectionState {
  Auto,
  Manual,
  None
}

export class CardPackage {

  constructor (
    public name: string,
    public required: boolean,
    public type: string, //radio,checkbox
    public options: Card[] = [],
    public mode: PackageSelectionState = PackageSelectionState.Auto

  ) { }

}

export class Deck {
  public stats: DeckStats;
  constructor (
    public cards: CardInDeck[]
  ) { };
}

export class CardInDeck {

  constructor (
    public card: Card,
    public quantity: number,
    public priority: number

  ) { };

}

export class ColorStats {
  public W: number = 0;
  public U: number = 0;
  public B: number = 0;
  public R: number = 0;
  public G: number = 0;
}

export class DeckStats {

  spells: ColorStats = new ColorStats();
  mana: ColorStats = new ColorStats();
  curve: { [rank: number]: number } = {};
}