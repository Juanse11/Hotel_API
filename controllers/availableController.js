var Reservation = require("../models/reservationModel");
var Hotel = require("../models/hotelModel");
exports.findAvailables = function (req, res) {
var query = req.query;
    Hotel.aggregate([
        {
            $lookup: {
                from: "reservations",
                localField: "_id",
                foreignField: "hotelID",
                as: "reservation"
            }
        },
        { $unwind: { path: "$reservation"} },
        { $project: { "reservation": 1, "state": 1, "_id": 1 , "rooms":1, "startDate":1, "endDate": 1 } },
        {
            $match: {
                $or: [{
                    $and: [{
                        "state": query.state
                    },
                    {
                        "reservation.startDate": {
                            $lte: query.endDate,
                        },
                    }, {
                        "reservation.endDate": {
                            $gte: query.startDate,
                        },
                    }]
                },
                { $and: [{ 
                    "reservation": { "$exists": false } 
                    }, 
                    { "state": query.state }] 
                }]
            }
        }, {
            $group: {
                _id: { hotelID: "$_id", totalRooms: "$rooms",state: "$state", startDate: query.startDate, endDate: query.endDate },
                availableRooms: { $sum: "$reservation.rooms_booked"}

            }
        },
        { $sort: { availableRooms: -1} } 
    ])
    .then(function (result) {
        console.log(result)
        result.forEach((hotel,index) => {
            Hotel.find()
            .then(function(hotel){
                if (hotel._id !== result._id.hotelID) {
                    var newHotel = { _id.hotelID: hotel._id }
                    result.push()
                }
            });
                 var availables = hotel._id.totalRooms - hotel.availableRooms;
                 hotel.availableRooms = availables;
                 if (availables <=0) {
                     result.splice(index,1);
                 }
             });
        res.json({ length: result.length, results: result});

    });
};

