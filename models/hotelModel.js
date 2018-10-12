var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    name: {type: String, required: [true, "A name is required"] },
    address: { type: String, required: [true, "An address is required"] },
    state: { type: String, required: [true, "A state is required"] },
    phone: String,
    fax: String,
    email: String,
    website: String,
    type: { type: String, required: [true, "A type is required"] },
    rooms: { type: Number, required: [true, "The number of rooms is required"] },
    size: String,
    coordinates:[Number]
    
}, {
        versionKey: false
    });
module.exports =  mongoose.model('Hotel', hotelSchema);