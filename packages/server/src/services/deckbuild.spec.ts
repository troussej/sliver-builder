//{1}, {T}: Add {W}{U}.



import { DeckBuilder } from './deckbuilder';
import { ColorStats } from '../../../common/src/models/Deck';

describe('CardsService', () => {

  let service: DeckBuilder;

  beforeEach(() => { service = new DeckBuilder(); });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  describe('matchOracleText', () => {
    it('should match "Add {G}."', () => {
      let res = service.matchOracleText('Add {G}.');
      expect(res).toBeDefined();
      expect(res.length).toBeGreaterThanOrEqual(4);
      expect(res[3]).toEqual('Add {G}');
    })
  })

  describe('matchAddMana', () => {
    it('should match "Add {G}"', () => {
      let res = service.matchAddMana('Add {G}');

      expect(res).toBeTruthy();

    })
  })

  describe('countOccurence', () => {
    it('should count "{G}" once', () => {
      let res = service.countOccurence('Add {G}', service.COUNT_G);
      expect(res).toEqual(1);

    })
    it('should count multiples', () => {
      let res = service.countOccurence('Add {G}{G}{B}', service.COUNT_G);
      expect(res).toEqual(2);

    })
    it('should count unordered', () => {
      let res = service.countOccurence('Add {G}{U}{G}', service.COUNT_G);
      expect(res).toEqual(2);

    })

    it('should count add up', () => {
      let val = 1;
      val += service.countOccurence('Add {G}{U}{G}', service.COUNT_G);
      expect(val).toEqual(3);

    })
  })

  describe('calcManaSources', () => {
    const stat: ColorStats = new ColorStats();

    it('should count G', () => {
      service.calcManaSources('Add {G}.', stat);
      expect(stat.G).toEqual(1);
    })
  })


});
