import { Deck, CardPackage, PackageSelectionState, CardInDeck, DeckStats } from 'sliver-builder-common';
import { logger } from '../util/logger';
import appConfig from '../config/config';
import _ from 'lodash';
import { Card } from 'scryfall-sdk-jtro';

const ORACLE_LINE = /\(?(([^.]*):)?([^.]*).\)?/;
const ADD_MANA = /([Aa]dd)(([^\{}]*(\{[CWUBRG]})+)+)\./
const COUNT_W = /\{W}/g;
const COUNT_U = /\{U}/g;
const COUNT_B = /\{B}/g;
const COUNT_R = /\{R}/g;
const COUNT_G = /\{G}/g;
const COUNT_C = /\{C}/g;

export class DeckBuilder {

  public build(config: CardPackage[]): Deck {
    logger.silly('build %j', config);

    let deck: Deck = new Deck([]);

    this.addManualCards(deck, config);

    this.computeColors(deck);

    this.sortDeck(deck);
    return deck;
  }
  sortDeck(deck: Deck) {
    deck.cards = _.sortBy(deck.cards, "priority");
  }

  computeColors(deck: Deck): void {




    let stats = _.reduce(deck.cards, function (res: DeckStats, cardInDeck: CardInDeck) {

      let quantity = cardInDeck.quantity;

      let cost = cardInDeck.card.mana_cost;

      res.spells.W += this.countOccurence(cost, COUNT_W);
      res.spells.U += this.countOccurence(cost, COUNT_U);
      res.spells.B += this.countOccurence(cost, COUNT_B);
      res.spells.R += this.countOccurence(cost, COUNT_R);
      res.spells.G += this.countOccurence(cost, COUNT_G);

      let oracleText = cardInDeck.card.oracle_text;

      //costs

      return res;
    }.bind(this),
      new DeckStats());

    deck.stats = stats;
  }

  countOccurence(val: string, regex: RegExp): number {
    return (val.match(regex) || []).length;

  }

  addManualCards(deck: Deck, config: CardPackage[]) {
    logger.debug("addManualCards %j %j", deck, config)
    _.chain(config)
      .filter(pkg => pkg.mode === PackageSelectionState.Manual)
      .tap(data => logger.debug('post filter %j', _.map(data, "name")))
      .each(pkg => {
        logger.debug('pkg : %j', pkg);
        let priority = (appConfig as any).packages[pkg.name].priority;
        let cid: CardInDeck[] = _.map(pkg.options, card => new CardInDeck(card, 1, priority));

        logger.debug('cid : %j', cid);
        deck.cards = _.concat(deck.cards, cid);
      })
      .value();

  }
}