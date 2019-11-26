import * as express from 'express';
import Scryfall from '../../services/scryfall';
import Controller from '../controller.interface';

export class CardController implements Controller {
  public path = '/cards';
  public router = express.Router();

  constructor(private scryfall: Scryfall) {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router
      .get('/collection/:name',
        function (req: any, res: any) {

          this.scryfall.getCollection(req.params.name).then((data: any) => {
            res.status(200).json(data);
          });
        }.bind(this),
      );

  }
}

