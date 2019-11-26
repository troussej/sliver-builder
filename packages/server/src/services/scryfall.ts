import cacheManager from 'cache-manager';
// tslint:disable-next-line: no-var-requires
const fsStore = require('cache-manager-fs');
import _ from 'lodash';
import * as  Scry from 'scryfall-sdk-jtro';
import MagicQuerier from 'scryfall-sdk-jtro/out/util/MagicQuerier';
import { config } from '../config/config';
import { logger } from '../util/logger';

export default class Scryfall {
  private cache: cacheManager.Cache;

  constructor() {
    logger.debug('SCRYFALL_URI : %s', process.env.SCRYFALL_URI);
    this.initCache().then(() => logger.debug('scryfall cache initialized'));
  }

  public searchByNickname(nickname: string): Promise<Scry.Card[]> {

    const key: string = `nickname:${nickname}`;
    // const res: Scry.Card[] = this.cache.get(key);

    return this.cache.wrap(key, () => {
      logger.debug('calling scryfall for %s', key);
      logger.silly('SCRYFALL_URI : %s', process.env.SCRYFALL_URI);
      return Scry.Cards.search(`is:${nickname}`).waitForAll()
        .then(data => _.sortBy(data, 'name'))
        .catch((err: Error) => {
          logger.error(err);
          return [];
        });
    });

  }

  public getCollection(collectionName: string, cards: string[]): Promise<Scry.Card[]> {

    const key: string = `collection:${collectionName}`;

    return this.cache.wrap(key, () => {
      if (!_.isNil(cards)) {
        const ids: Scry.CardIdentifier[] = _.map(cards, (name: string) => Scry.CardIdentifier.byName(name));

        logger.debug('calling scryfall for %s', key);
        logger.silly('SCRYFALL_URI : %s', process.env.SCRYFALL_URI);
        return Scry.Cards.collection(...ids).waitForAll()
          .then(data => _.sortBy(data, 'name'))
          .then((data) => {
            logger.silly('scryfall result for %j : %j - err: %s', ids, data, MagicQuerier.lastError);
            return data;
          })
          .catch((err: Error) => {
            logger.error(err);
            return [];
          });

      }
      logger.warn('no collection configuration for %s, returning empty', key);
      return Promise.resolve([]);
    });
  }

  private initCache(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.cache = cacheManager.caching({
        store: fsStore,
        ttl: 60 * 60,
        options: {
          ttl: 60 * 60 /* seconds */,
          maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
          path: '.cache',
          preventfill: false,
          fillcallback: () => {
            resolve(true);
          }
        },
      });
    });
  }
}
