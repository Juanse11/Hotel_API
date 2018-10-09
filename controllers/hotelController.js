var Hotel = require("../models/hotelModel");

exports.findAll = function (req, res, next) {

    var query = req.query;
    var range = query.range;
    if (range) {
        var maxlat = Number(query.lat) + Number(range);
        var minlat = Number(query.lat) - Number(range);
        var maxlon = Number(query.lon) + Number(range);
        var minlon = Number(query.lon) - Number(range);

        Hotel.find({ latitude: { $gte: minlat, $lte: maxlat }, longitude: { $gte: minlon, $lte: maxlon } }, function (err, result) {
            res.json({ length: result.length, records: result });
        });
    } else {
        next();
    }
};

exports.findByRange = function (req, res) {
    var query = req.query;
    Hotel.find(query, function (err, result) {
        res.json({ length: result.length, records: result });
    });
};

exports.create = function (req, res) {
    var hotel = req.body;
    if (hotel.apiKey) {
        delete hotel.apiKey;
        Hotel.create(hotel, function (err, hotelCreated) {
            if (err) {
                res.json(err);
            } else {
                res.json({ message: "Hotel created successfully!", hotelID: hotelCreated._id });
            }
        });
    } else {
        res.json({ message: "Unauthorized access. API key required." });
    }

};

exports.update = function (req, res) {
    var hotelUpdate = req.body;
    Hotel.updateOne({ _id: req.params.id }, { $set: hotelUpdate }, function (err, result) {
        console.log(result);
        if (err) {
            res.json(err);
        } else if (result.n === 0) {
            res.json({ message: "ERROR. The hotel does not exist." });
        } else {
            res.json({ message: "Hotel updated succesfully" });
        }
    });
};

exports.delete = function (req, res) {
    var hotelDelete = req.params.id;
    Hotel.deleteOne({ _id: req.params.id }, function (err, result) {
        res.json({ message: "Hotel deleted succesfully!" });
    });


};