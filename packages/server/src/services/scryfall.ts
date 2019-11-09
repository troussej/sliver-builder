import * as  Scry from "scryfall-sdk";

export default class Scryfall {
    public getCommanders() {
        return Scry.Cards.search("type:legendary type:sliver").waitForAll();

    }
}




