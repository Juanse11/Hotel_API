var express = require("express");
var app = express();
var router = express.Router();

var User = require("../models/userModel");

router.route("/").get(function (req, res) {
    User.find({}, function (err, result) {
        res.json({ users: result });
    });
});

router.route("/").post(function (req, res) {
    var user = req.body;
    User.create(user, function (err, userCreated) {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "User created succesfully!", userID: userCreated._id });
        }

    });
});

router.route("/:id").put(function (req, res) {
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
});

module.exports = router;