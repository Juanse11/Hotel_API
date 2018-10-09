var express = require("express");
var app = express();
var router = express.Router();
var token = require("../controllers/tokenController");



router.route("/").post(token.create);

module.exports = router;