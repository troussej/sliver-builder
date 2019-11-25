import * as  Scry from "scryfall-sdk-jtro";
import _ from 'lodash';
import { config } from '../config/config';
import NodeCache from 'node-cache';
import { logger } from "../util/logger";


export default class Scryfall {
  private cache: NodeCache;

  constructor () {
    this.cache = new NodeCache();
  }

  public getCollection(collectionName: string) {

    const key = `collection:${collectionName}`;
    let res = this.cache.get(key);

    if (_.isNil(res)) {
      let conf: any = config.packages;
      if (!_.isNil(conf[collectionName])) {
        let ids: Scry.CardIdentifier[] = _.map(conf[collectionName].cards, (name: string) => Scry.CardIdentifier.byName(name));

        logger.debug('calling scryfall for %s', key);

        return Scry.Cards.collection(...ids).waitForAll()
          .then(data => _.sortBy(data, 'name'))
          .then(data => {
            logger.silly('scryfall result for %j : %j', ids, data);
            this.cache.set(key, data);
            return data;
          })
          .catch((err: any) => {
            logger.error(err);
            return [];
          })



      } else {
        logger.warn('no collection configuration for %s, returning empty', key);

        this.cache.set(key, []);
        return Promise.resolve([]);
      }
    } else {
      logger.silly('returning cached value for %s', key);

      return Promise.resolve(res);
    }


  }
}




