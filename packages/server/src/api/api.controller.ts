import * as express from 'express';
import Controller from './controller.interface';
import { CardController } from './card/card.controller';

export class ApiController implements Controller {
    public path = '/api';
    public router = express.Router();

    constructor() {
        let card = new CardController();
        this.router.use('/api', card.router);

    }
}