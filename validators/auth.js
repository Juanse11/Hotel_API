var token = require("../models/tokenModel");

module.exports = function(req,res,next){
    var apiKey = req.body.apiKey;
    token.find({apiKey: apiKey })
    .then(function(err,result){
        if (result.length !== 0) {
            next();
        }else{
            res.json({message: "Error: API Key not valid."})
        }
    });
};