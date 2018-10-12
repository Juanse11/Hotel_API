var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    email: { type: String, required: [true,"An email is required"] },
    contact: { type: String, required: [true, "A contact is required"] },
    company: { type: String, required: [true, "A company is required"] },
    apiKey: { type: String}
}, {
        versionKey: false
    });


module.exports = mongoose.model("Token",tokenSchema);