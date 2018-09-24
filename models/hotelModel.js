var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    name: String,
    address: String,
    state: String,
    phone: String,
    fax: String,
    email: String,
    website: String,
    type: String,
    rooms: Number,
    size: String,
    latitude: Number,
    longitude: Number
});
module.exports =  mongoose.model('Hotel', hotelSchema);