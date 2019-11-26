import * as express from 'express';
import Scryfall from '../services/scryfall';
import { CardController } from './card/card.controller';
import Controller from './controller.interface';
import { DeckController } from './deck/deck.controller';

export class ApiController implements Controller {
  public path = '/api';
  public router = express.Router();

  private scryfall: Scryfall;

  constructor() {
    this.scryfall = new Scryfall();

    const card = new CardController(this.scryfall);
    this.router.use(card.path, card.router);

    const deck = new DeckController(this.scryfall);
    this.router.use(deck.path, deck.router);

  }
}
