var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    hotelID: { type: Schema.Types.ObjectId, required: [true, "You need an hotelID to make a booking"] },
    userID: { type: String, required: [true, "You need an userId to make a booking"] },
    startDate: {type: String, required: [true, "You need a start date to make a booking"]},
    endDate: {type: String, required: [true, "You need an end date to make a booking"]},
    rooms_booked: { type: Number, required: [true, "You need to specify the number of rooms to book "], min: [1, 'You need to book at least 1 room'] }
}, {
        versionKey: false
    });


module.exports = mongoose.model("Reservation", reservationSchema);