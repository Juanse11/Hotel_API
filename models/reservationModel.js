var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reservationSchema = new Schema({
    hotelID: { type: String, required: true },
    userID: { type: String, required: true },
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    rooms_booked: { type: Number, required: true, min: [1, 'You need to book at least 1 room'] }
}, {
        versionKey: false
    });


module.exports = mongoose.model("Reservation", reservationSchema);