import * as express from 'express';
import { CardController } from './card/card.controller';
import Controller from './controller.interface';
import { DeckController } from './deck/deck.controller';

export class ApiController implements Controller {
  public path = '/api';
  public router = express.Router();

  constructor() {
      const card = new CardController();
      this.router.use(card.path, card.router);

      const deck = new DeckController();
      this.router.use(deck.path, deck.router);

    }
}
