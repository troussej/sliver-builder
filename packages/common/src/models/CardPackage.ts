import { Card } from 'scryfall-sdk';
import { PackageSelectionState } from './PackageSelectionState';
export class CardPackage {
  constructor (
    public name: string,
    public required: boolean,
    public type: string, // radio,checkbox
    public options: Card[] = [],
    public mode: PackageSelectionState = PackageSelectionState.Auto,
  ) { }
}
