var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
}, {
        versionKey: false
    });


module.exports = mongoose.model("User",userSchema);