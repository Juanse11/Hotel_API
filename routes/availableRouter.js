var express = require("express");
var router = express.Router();
var available = require("../controllers/availableController");


router.route("/").get(available.findAvailables);




module.exports = router;