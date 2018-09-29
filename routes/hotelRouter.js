var express = require("express");
var app = express();
var router = express.Router();

var Hotel = require("../models/hotelModel");
var request = require("request");

router.route("/").get(function (req, res,next) {

    var query = req.query;
    var range = query.range;
    if (range) {
        var maxlat = Number(query.lat) + Number(range);
        var minlat = Number(query.lat) - Number(range);
        var maxlon = Number(query.lon) + Number(range);
        var minlon = Number(query.lon) - Number(range);
        
        Hotel.find({ latitude: { $gte: minlat, $lte: maxlat }, longitude: { $gte: minlon, $lte: maxlon } }, function(err,result){
            res.json({ length: result.length,records: result});
        });
    }else{
        next();
    }
});

router.route("/").get(function (req, res) {
    var query = req.query;
    Hotel.find(query, function (err, result) {
        res.json({ length: result.length, records: result });
    });
});




module.exports = router;