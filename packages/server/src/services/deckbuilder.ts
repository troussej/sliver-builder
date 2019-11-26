import _ from 'lodash';
import { Card } from 'scryfall-sdk-jtro';
import { CardInDeck, CardPackage, ColorStats, Deck, DeckForm, DeckStats, PackageSelectionState } from 'sliver-builder-common';

import { config as appConfig, PackageConfig } from '../config/config';
import { logger } from '../util/logger';

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
  public LAND = /\bLand\b/;

  public build(form: DeckForm): Deck {
    logger.silly('build %j', form);

    const deck: Deck = new Deck([]);

    this.addManualCards(deck, form.packages);

    this.computeStats(deck);

    this.completeWithAutoCards(deck);

    this.sortDeck(deck);
    return deck;
  }
  public completeWithAutoCards(deck: Deck): void {
    throw new Error('Method not implemented.');
  }
  public sortDeck(deck: Deck) {
    deck.cards = _.sortBy(deck.cards, 'priority');
  }

  public computeStats(deck: Deck): void {
    const stats = _.reduce(
      deck.cards,
      (res: DeckStats, cardInDeck: CardInDeck) => {

        const quantity = cardInDeck.quantity;

        // mana costs
        const cost = cardInDeck.card.mana_cost;

        res.spells.W += this.countOccurence(cost, this.COUNT_W);
        res.spells.U += this.countOccurence(cost, this.COUNT_U);
        res.spells.B += this.countOccurence(cost, this.COUNT_B);
        res.spells.R += this.countOccurence(cost, this.COUNT_R);
        res.spells.G += this.countOccurence(cost, this.COUNT_G);

        // mana sources
        const oracleText = cardInDeck.card.oracle_text;
        this.calcManaSources(oracleText, res.mana);

        // mana curve
        if (!this.isLand(cardInDeck.card)) {
          this.calcManaCurve(res.curve, cardInDeck.card.cmc);
        }

        return res;
      },
      new DeckStats(),
    );

    deck.stats = stats;
  }

  public isLand(card: Card) {
    return card.type_line.match(this.LAND);
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

  public calcManaCurve(curve: { [key: number]: number }, cmc: number): void {
    if (_.isNil(curve[cmc])) {
      curve[cmc] = 0;
    }
    curve[cmc] = curve[cmc] + 1;
  }

  public calcManaSources(oracleText: string, res: ColorStats) {
    const lines: string[] = oracleText.split('\n');
    lines.forEach((line: string) => {
      let matches: string[] = this.matchOracleText(line);

      if (!_.isNil(matches) && matches.length >= 4) {
        const rightHandSide = matches[3];
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

  public countOccurence(val: string, regex: RegExp): number {
    return (val.match(regex) || []).length;

  }

  public addManualCards(deck: Deck, config: CardPackage[]) {
    logger.debug('addManualCards %j %j', deck, config);
    _.chain(config)
      .filter((pkg: CardPackage) => pkg.mode === PackageSelectionState.Manual)
      .tap(data => logger.debug('post filter %j', _.map(data, 'name')))
      .each((pkg: CardPackage) => {
        logger.debug('pkg : %j', pkg);

        const pckConfig: PackageConfig = _.find(appConfig.packages, ['name', pkg.name]);

        const priority = pckConfig.priority;
        const cid: CardInDeck[] = _.map(pkg.options, card => new CardInDeck(card, 1, priority));

        logger.debug('cid : %j', cid);
        deck.cards = _.concat(deck.cards, cid);
      })
      .value();

  }
}
