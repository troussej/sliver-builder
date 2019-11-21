import { Deck, CardPackage, PackageSelectionState, CardInDeck, DeckStats } from 'sliver-builder-common';
import { logger } from '../util/logger';
import appConfig from '../config/config';
import _ from 'lodash';
import { Card } from 'scryfall-sdk-jtro';
import { ColorStats } from '../../../common/src/models/Deck';



export class DeckBuilder {

  public ORACLE_LINE = /\(?(([^.]*):)?([^.]*).\)?/;
  // public ADD_MANA = /([Aa]dd)(([^\{}]*(\{[CWUBRG]})+)+)/;
  public ADD_MANA = /([Aa]dd)/;
  public COUNT_W = /\{W}/g;
  public COUNT_U = /\{U}/g;
  public COUNT_B = /\{B}/g;
  public COUNT_R = /\{R}/g;
  public COUNT_G = /\{G}/g;
  public COUNT_C = /\{C}/g;

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

      //mana costs
      let cost = cardInDeck.card.mana_cost;

      res.spells.W += this.countOccurence(cost, this.COUNT_W);
      res.spells.U += this.countOccurence(cost, this.COUNT_U);
      res.spells.B += this.countOccurence(cost, this.COUNT_B);
      res.spells.R += this.countOccurence(cost, this.COUNT_R);
      res.spells.G += this.countOccurence(cost, this.COUNT_G);

      //mana sources
      let oracleText = cardInDeck.card.oracle_text;

      this.calcManaSources(oracleText, res.mana);




      return res;
    }.bind(this),
      new DeckStats());

    deck.stats = stats;
  }

  public matchOracleText(text: string): string[] {
    const res = text.match(this.ORACLE_LINE);
    logger.silly('ORACLE_LINE matches %s %j', text, res);
    return res;
  }

  public matchAddMana(text: string): string[] {
    const res = text.match(this.ADD_MANA);
    logger.silly('ADD_MANA matches %s %j', text, res);
    return res;
  }

  public calcManaSources(oracleText: string, res: ColorStats) {
    let lines = oracleText.split('\n')
    lines.forEach(line => {
      let matches: string[] = this.matchOracleText(line);

      if (!_.isNil(matches) && matches.length >= 4) {
        let rightHandSide = matches[3];
        matches = this.matchAddMana(rightHandSide);

        if (!_.isNil(matches) && matches.length > 0) {
          res.W += this.countOccurence(rightHandSide, this.COUNT_W);
          res.U += this.countOccurence(rightHandSide, this.COUNT_U);
          res.B += this.countOccurence(rightHandSide, this.COUNT_B);
          res.R += this.countOccurence(rightHandSide, this.COUNT_R);
          res.G += this.countOccurence(rightHandSide, this.COUNT_G);
        }
      }
    });

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