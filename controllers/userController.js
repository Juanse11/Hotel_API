var User = require("../models/userModel");

exports.findAll = function (req, res) {
    User.find({}, function (err, result) {
        res.json({ users: result });
    });
};

exports.create = function (req, res) {
    var user = req.body;
    User.create(user, function (err, userCreated) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "User created succesfully!", userID: userCreated._id });
        }

    });
};

exports.update = function (req, res) {
    var userUpdated = req.body;
    User.updateOne({ _id: req.params.id }, { $set: userUpdated }, function (err, result) {
        console.log(result);
        if (err) {
            res.json({ message: err });
        } else if (result.n === 0) {
            res.json({ message: "ERROR. The user does not exist." });
        } else {
            res.json({ message: "User updated succesfully" });
        }
    });
};