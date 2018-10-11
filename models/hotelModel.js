var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    name: {type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    phone: String,
    fax: String,
    email: String,
    website: String,
    type: { type: String, required: true },
    rooms: { type: Number, required: true },
    size: String,
    coordinates:[Number]
    
}, {
        versionKey: false
    });
module.exports =  mongoose.model('Hotel', hotelSchema);