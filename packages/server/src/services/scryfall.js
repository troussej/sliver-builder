const Scry = require("scryfall-sdk");

const scryfall = {

    CardById(id) {
        return Scry.Cards.byId("9ea8179a-d3c9-4cdc-a5b5-68cc73279050")
    }
}

module.exports = scryfall;