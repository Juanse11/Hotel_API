var Reservation = require("../models/reservationModel");
var Hotel = require("../models/hotelModel");
exports.book = function(req,res){
    var reservation = req.body;
    console.log(reservation);
    Reservation.aggregate([
        
        {
        $match: {
            $and: [{
                hotelID: reservation.hotelID
            },
                {
                startDate: {
                    $lte: reservation.endDate,
                },
            }, {
                endDate: {
                    $gte: reservation.startDate,
                },
            }] },
        }, {
        $group: {
            _id: null,
            total: {
                $sum: "$rooms_booked"
            }
        }
    }],function (err, result) {
            console.log(result);
            var occupied = result;
            console.log(occupied);
            if (occupied.length !== 0) {
                Hotel.findById(reservation.hotelID, function (err, hotel) {
                    var availables = hotel.rooms - occupied[0].total;
                    console.log("availables: " + availables);
                    if (availables >= reservation.rooms_booked) {
                        Reservation.create(reservation, function (err, result) {
                            res.json({ message: "Your reservation was succesful!", reservationID: result._id });
                        });
                    } else {
                        res.json({ message: "ERROR: There are not enough rooms available." });
                    }

                });
            }
        });  
};

