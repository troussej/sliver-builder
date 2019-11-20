import { Deck, CardPackage, PackageSelectionState, DeckColors, ColorStats } from 'sliver-builder-common';
import { logger } from '../util/logger';
import _ from 'lodash';
import { CardInDeck } from '../../../common/src/models/Deck';
export class DeckBuilder {


  public build(config: CardPackage[]): Deck {
    logger.silly('build %j', config);

    let deck: Deck = new Deck([]);

    this.addManualCards(deck, config);

    this.computeColors(deck);

    return deck;
  }

  computeColors(deck: Deck): DeckColors {
    let stats = new DeckColors();

    return stats;


  }

  addManualCards(deck: Deck, config: CardPackage[]) {
    logger.debug("addManualCards %d", PackageSelectionState.Manual)
    _.chain(config)
      .filter(pkg => pkg.mode === PackageSelectionState.Manual)
      .tap(logger.silly)
      .each(pkg => {
        let priority = 0;
        let cid: CardInDeck[] = _.map(pkg.options, card => new CardInDeck(card, 1, priority));

        _.concat(deck.cards, cid);
      });

  }
}