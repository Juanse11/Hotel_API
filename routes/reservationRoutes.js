var express = require("express");
var router = express.Router();
var auth = require("../validators/auth");
var reservation = require("../controllers/reservationsController");


router.route("/").post(reservation.book);




module.exports = router;