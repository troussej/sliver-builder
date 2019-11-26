import { ColorStats } from './ColorStats';

export class DeckStats {
  public spells: ColorStats = new ColorStats();
  public mana: ColorStats = new ColorStats();
  public curve: {
    [rank: number]: number;
  } = {};
}
