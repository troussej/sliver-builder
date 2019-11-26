import { CardPackage } from './CardPackage';
import { DeckOptions } from './DeckOptions';
export class DeckForm {
  constructor (public options: DeckOptions, public packages: CardPackage[]) { }
}
