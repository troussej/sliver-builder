import { Card } from "scryfall-sdk";

export enum PackageSelectionState {
    All,
    None,
    Some
}

export class CardPackage {

    constructor(
        public name: string,
        public required: boolean,
        public type: string, //radio,checkbox
        public options: Card[] = [],
        public state: PackageSelectionState = PackageSelectionState.None, //all/none/some     
        public cards: Card[] = []
    ) { }

}