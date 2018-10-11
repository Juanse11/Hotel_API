var Reservation = require("../models/reservationModel");
var Hotel = require("../models/hotelModel");
exports.book = function(req,res){
    var reservation = req.body;

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
    }])
    .then(function (result) {
            var occupied = result;
            var availables;
            
                Hotel.findById(reservation.hotelID)
                .then(function (hotel) {
                    
                    if (occupied.length !== 0) {
                        availables = hotel.rooms - occupied[0].total;
                    } else {
                        availables = hotel.rooms;
                    }

                    if (availables >= reservation.rooms_booked) {
                        Reservation.create(reservation)
                        .then(function (reservation) {
                            res.json({ message: "Your reservation was succesful!", reservationID: reservation._id });
                        })
                        .catch(function (error) {
                            res.json(error);
                        });
                    } else {
                        res.json({ message: "ERROR: There are not enough rooms available." });
                    }

                });
            
        });  
};

