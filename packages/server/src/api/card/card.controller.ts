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

        this.router.
            get("/cards", function (req: any, res: any) {
                // db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
                //     if (err) {
                //         handleError(res, err.message, "Failed to get contacts.");
                //     } else {
                //         res.status(200).json(docs);
                //     }
                // });

                this.scryfall.CardById().then((data: any) => {
                    res.status(200).json(data);
                })
            }.bind(this));
    }
}

