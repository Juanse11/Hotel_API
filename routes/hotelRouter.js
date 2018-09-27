var express = require("express");
var app = express();
var router = express.Router();

var Hotel = require("../models/hotelModel");
var request = require("request");

router.route("/").get(function (req, res) {

    var query = req.query;
    Hotel.find(query, function (err, result) {
        res.json({ length: result.length, records: result });
    });

});



module.exports = router;