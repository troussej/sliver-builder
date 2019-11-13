import * as  Scry from "scryfall-sdk";
import * as _ from 'lodash';
import config from '../config/config';

export default class Scryfall {
    public getCommanders() {


        return Scry.Cards.search("type:legendary type:sliver").waitForAll();

    }

    public getRamp() {

        let ids: Scry.CardIdentifier[] = _.map(config.cards.rocks, (name: string) => Scry.CardIdentifier.byName(name));

        return Scry.Cards.collection(...ids).waitForAll();
    }
}




