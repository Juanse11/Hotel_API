var express = require("express");
var router = express.Router();
var auth = require("../validators/auth");
var hotel = require("../controllers/hotelController");

router.route("/").get(hotel.findAll);

router.route("/").get(hotel.findByRange);

router.route("/").post(auth,hotel.create);

router.route("/:id").put(auth,hotel.update);

router.route("/:id").delete(auth,hotel.delete);


module.exports = router;