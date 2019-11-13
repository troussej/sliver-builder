import * as  Scry from "scryfall-sdk-jtro";
import * as _ from 'lodash';
import config from '../config/config';

export default class Scryfall {



    public getCollection(collectionName: string) {
        let conf: any = config.cards;
        if (!_.isNil(conf[collectionName])) {
            let ids: Scry.CardIdentifier[] = _.map(conf[collectionName], (name: string) => Scry.CardIdentifier.byName(name));



            return Scry.Cards.collection(...ids).waitForAll();

        } else {
            return Promise.resolve([]);
        }
    }
}




