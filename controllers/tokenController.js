var Token = require("../models/tokenModel");
var apikey = require("apikeygen").apikey;

exports.create = function (req, res) {
    var token = req.body;
    token.apiKey = apikey();
    console.log(token.apiKey);
    Token.create(token, function (err, tokenCreated) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Company created succesfully!", APIKEY: tokenCreated.apiKey });
        }

    });
};