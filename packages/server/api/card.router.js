const express = require('express')
const router = express.Router()

var CONTACTS_COLLECTION = "contacts";

const Scryfall = require('../services/scryfall');


module.exports = (db, errorHandler) => {

    router.get("/cards", function(req, res) {
        // db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
        //     if (err) {
        //         handleError(res, err.message, "Failed to get contacts.");
        //     } else {
        //         res.status(200).json(docs);
        //     }
        // });

        Scryfall.CardById().then(data => {
            res.status(200).json(data);
        })
    });



    return router
};