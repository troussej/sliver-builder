import { Card } from "scryfall-sdk";

export enum PackageSelectionState {
    All,
    None,
    Some
}

export class CardPackage {
    name: string;
    required: boolean;
    type: string; //radio,checkbox
    state: PackageSelectionState; //all/none/some
    options: Card[];
    cards: Card[];
}