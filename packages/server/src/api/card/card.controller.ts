import * as express from 'express';
import Controller from '../controller.interface';
import Scryfall from '../../services/scryfall';






export class CardController implements Controller {
    public path = '/cards';
    public router = express.Router();
    private scryfall = new Scryfall();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router
            .get("/collection/:name",
                function (req: any, res: any) {

                    this.scryfall.getCollection(req.params.name).then((data: any) => {
                        res.status(200).json(data);
                    })
                }.bind(this)
            );


    }
}

