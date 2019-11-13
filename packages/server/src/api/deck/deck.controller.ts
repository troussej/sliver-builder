import * as express from 'express';
import Controller from '../controller.interface';
import * as _ from 'lodash';
import { Promise } from 'bluebird';
import { CardPackage } from 'sliver-builder-common';
import Scryfall from '../../services/scryfall';
import { logger } from '../../util/logger';

export class DeckController implements Controller {
    public path = '/decks';
    public router = express.Router();
    private scryfall: Scryfall = new Scryfall();

    private rawConfig: CardPackage[];

    constructor() {
        this.initializeRoutes();

        this.rawConfig = [];

        this.rawConfig.push(new CardPackage(
            "commanders",
            true,
            "radio"

        ));
        this.rawConfig.push(new CardPackage(
            "rocks",
            false,
            "checkbox"
        ));
        this.rawConfig.push(new CardPackage(
            "signets",
            false,
            "checkbox"
        ));
    }

    private initializeRoutes() {

        this.router
            .get("/config",
                function (req: any, res: any) {

                    let calls = _.map(this.rawConfig, (line: CardPackage) => this.scryfall.getCollection(line.name));

                    Promise
                        .all(calls)
                        .then((scryRes: any[]) => {
                            logger.debug('deck controller res %j', scryRes);

                            _.forEach(this.rawConfig, (line: CardPackage, index: number) => {
                                line.options = scryRes[index];
                            });

                            res.status(200).json(this.rawConfig);
                        })
                        .catch(err => {

                            logger.error(err);
                            res.status(503).json(err);
                        }
                        );

                }.bind(this)
            );


    }
}

