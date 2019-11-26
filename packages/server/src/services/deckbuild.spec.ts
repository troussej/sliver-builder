// {1}, {T}: Add {W}{U}.

import { ColorStats } from '../../../common/src/models/Deck';
import { DeckBuilder } from './deckbuilder';

describe('CardsService', () => {

  let service: DeckBuilder;

  beforeEach(() => { service = new DeckBuilder(); });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  describe('matchOracleText', () => {

    const testCases = [
      { text: 'Add {G}.', res: 'Add {G}' },
      {
        text: '{T}: Add {G} or {U}. Talisman of Curiosity deals 1 damage to you.',
        res: ' Add {G} or {U}',
      }];

    testCases.forEach(testCase => {
      it(`should match "${testCase.text}"`, () => {
        const res = service.matchOracleText(testCase.text);
        expect(res).toBeDefined();
        expect(res.length).toBeGreaterThanOrEqual(4);
        expect(res[3]).toEqual(testCase.res);
      });
    });

    //
  });

  describe('matchAddMana', () => {
    it('should match "Add {G}"', () => {
      const res = service.matchAddMana('Add {G}');

      expect(res).toBeTruthy();

    });
  });

  describe('countOccurence', () => {
    it('should count "{G}" once', () => {
      const res = service.countOccurence('Add {G}', service.COUNT_G);
      expect(res).toEqual(1);

    });
    it('should count multiples', () => {
      const res = service.countOccurence('Add {G}{G}{B}', service.COUNT_G);
      expect(res).toEqual(2);

    });
    it('should count unordered', () => {
      const res = service.countOccurence('Add {G}{U}{G}', service.COUNT_G);
      expect(res).toEqual(2);

    });

    it('should count add up', () => {
      let val = 1;
      val += service.countOccurence('Add {G}{U}{G}', service.COUNT_G);
      expect(val).toEqual(3);

    });
  });

  describe('calcManaSources', () => {
    let stat: ColorStats;

    beforeEach(() => { stat = new ColorStats(); });

    it('should count G', () => {
      service.calcManaSources('Add {G}.', stat);
      expect(stat.G).toEqual(1);
    });

    it('should count complex sources', () => {
      service.calcManaSources('{T}: Add {G} or {U}. Talisman of Curiosity deals 1 damage to you.', stat);
      expect(stat.W).toEqual(0);
      expect(stat.U).toEqual(1);
      expect(stat.B).toEqual(0);
      expect(stat.R).toEqual(0);
      expect(stat.G).toEqual(1);
    });

    //
    it('should count multilines', () => {
      service.calcManaSources('{T}: Add {C}.\n{T}: Add {G} or {U}. Talisman of Curiosity deals 1 damage to you.', stat);
      expect(stat.W).toEqual(0);
      expect(stat.U).toEqual(1);
      expect(stat.B).toEqual(0);
      expect(stat.R).toEqual(0);
      expect(stat.G).toEqual(1);
    });
  });

});
