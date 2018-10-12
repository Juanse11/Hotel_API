var Hotel = require("../models/hotelModel");

exports.findByRange = function (req, res,next) {
    if (req.query.range) {
        var query = req.query;
        var longitude = Number(query.longitude);
        var latitude = Number(query.latitude);
        delete query.longitude;
        delete query.latitude;
        Hotel.find(
            {
                location:
                {
                    $near:
                    {
                        $geometry: { type: "Point", coordinates: [longitude, latitude] },
                        $maxDistance: Number(query.range) * 1000
                    }
                }
            }
        ).then(function (result) {
            res.json({ length: result.length, records: result });
        });
    }else{
        next();
    }
};

exports.findAll = function (req, res) {
    var query = req.query;
    Hotel.find(query, function (err, result) {
        res.json({ length: result.length, records: result });
    });
};

function getHotelSize(rooms){
    if (rooms<=50) {
        return "small";
    }else if(rooms >= 51 & rooms <=100){
        return "medium";
    }else{
        return "large";
    }
}

exports.create = function (req, res) {
    var hotel = req.body;
    if (hotel.apiKey) {
        delete hotel.apiKey;
        hotel.size = getHotelSize(hotel.rooms);
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