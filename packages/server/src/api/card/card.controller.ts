import * as express from 'express';
import Controller from 'api/controller.interface';
const router = express.Router()



const Scryfall = require('../../services/scryfall');

export class CardController implements Controller {
    public path = '/posts';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.
            get("/cards", function (req, res) {
                // db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
                //     if (err) {
                //         handleError(res, err.message, "Failed to get contacts.");
                //     } else {
                //         res.status(200).json(docs);
                //     }
                // });

                Scryfall.CardById().then((data: any) => {
                    res.status(200).json(data);
                })
            });
    }
}

