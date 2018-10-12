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
        { $unwind: { path: "$reservation", "preserveNullAndEmptyArrays": true } },
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
                    "reservation.startDate": { "$exists": false } 
                    }, 
                    { "state": query.state }] 
                }]
            }
        }, {
            $group: {
                _id: { state: "$state", startDate: query.startDate, endDate: query.endDate },
                availableHotels: {
                    $push: {
                        hotelID: "$_id", totalRooms: "$rooms", availableRooms: {
                            $sum: "$reservation.rooms_booked"
                    }}
                }
                
            }
        } 
    ])
    .then(function (result) {
        result[0].length = result[0].availableHotels.length;
        result[0].availableHotels.forEach((hotel,index) => {
                 var availables = hotel.totalRooms - hotel.availableRooms;
                 hotel.availableRooms = availables;
                 if (availables <=0) {
                     result.splice(index,1);
                 }
             });
        res.json({ length: result[0].length, results: result});

    });
};

