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

Hotel.find(function (err, result) {
    result.forEach(function (hotel) {
        var address = encodeURIComponent(hotel.address.replace(/"/g, ""));
        
        var url = "https://api.tomtom.com/search/2/geocode/"+address+".json?key=rGYSfp1LAs3MxKC65PHmwty97ZnZrX8G&limit=1&countrySet=IN";
        request(url, function (error, response, body) {
            console.log(url);
            var data = JSON.parse(body);
                if(data.results.length !== 0){
                    Hotel.updateOne({ address: hotel.address },
                        {
                            $set: {
                                latitude: data.results[0].position.lat,
                                longitude: data.results[0].position.lon
                            }
                        });
                    }

        });
    });
});
module.exports = router;