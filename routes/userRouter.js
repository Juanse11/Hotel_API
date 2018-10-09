var express = require("express");
var router = express.Router();
var user = require("../controllers/userController");



router.route("/").get(user.findAll);

router.route("/").post(user.create);

router.route("/:id").put(user.update);

module.exports = router;