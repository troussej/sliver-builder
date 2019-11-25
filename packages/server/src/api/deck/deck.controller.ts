import * as express from 'express';
import Controller from '../controller.interface';
import * as _ from 'lodash';
import { Promise } from 'bluebird';
import { CardPackage, Deck } from 'sliver-builder-common';
import Scryfall from '../../services/scryfall';
import { logger } from '../../util/logger';
import { DeckBuilder } from '../../services/deckbuilder';
import { config, PackageConfig } from '../../config/config';

export class DeckController implements Controller {
  public path = '/decks';
  public router = express.Router();
  private scryfall: Scryfall = new Scryfall();
  private deckbuilder: DeckBuilder = new DeckBuilder();

  constructor () {
    this.initializeRoutes();



  }

  private initFormConfig(): Promise<CardPackage[]> {

    const activeConf: PackageConfig[] = _.filter(config.packages, "active");

    const formConfig: CardPackage[] = _.map(activeConf, (packageDef: PackageConfig) =>
      new CardPackage(
        packageDef.name,
        true,
        packageDef.type,
        null,
        packageDef.defaultMode
      )
    )

    let calls = _.map(activeConf, (line: PackageConfig) => this.scryfall.getCollection(line.name, line.cards));

    return Promise
      .all(calls)
      .then((scryRes: any[]) => {

        _.forEach(formConfig, (line: CardPackage, index: number) => {
          line.options = scryRes[index];
        });
        return formConfig;
      });
  }

  private initializeRoutes() {

    this.router
      .get("/config",
        function (req: any, res: any) {



          let calls = _.map(this.rawConfig, (line: CardPackage) => this.scryfall.getCollection(line.name));

          this.initFormConfig()
            .then((formConfig: CardPackage[]) => {
              logger.debug('after initFormConfig ');
              logger.silly('deck controller res %j', formConfig);



              res.status(200).json(formConfig);
            })
            .catch((err: any) => {

              logger.error(err);
              res.status(503).json(err);
            }
            );

        }.bind(this)
      ).post('/', function (req: any, res: any) {
        let deck = this.deckbuilder.build(req.body);

        res.status(200).json(deck);
      }.bind(this))


  }
}

