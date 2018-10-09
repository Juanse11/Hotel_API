var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    email: { type: String, required: true },
    contact: { type: String, required: true },
    company: { type: String, required: true },
    apiKey: { type: String}
}, {
        versionKey: false
    });


module.exports = mongoose.model("Token",tokenSchema);