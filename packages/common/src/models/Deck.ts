import { Card } from "scryfall-sdk";

export enum PackageSelectionState {
  Auto,
  Manual,
  None
}

export class CardPackage {

  constructor(
    public name: string,
    public required: boolean,
    public type: string, //radio,checkbox
    public options: Card[] = [],
    public mode: PackageSelectionState = PackageSelectionState.Auto

  ) { }

}

export class Deck {
  constructor(
    public cards: Card[]
  ) { };
}

export class CardInDeck {

  constructor(
    public card: Card,
    public quantity: number,
    public priority: number

  ) { };

}