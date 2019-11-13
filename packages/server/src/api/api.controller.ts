import * as express from 'express';
import Controller from './controller.interface';
import { CardController } from './card/card.controller';
import { DeckController } from './deck/deck.controller';

export class ApiController implements Controller {
    public path = '/api';
    public router = express.Router();

    constructor() {
        let card = new CardController();
        this.router.use(card.path, card.router);

        let deck = new DeckController();
        this.router.use(deck.path, deck.router);

    }
}