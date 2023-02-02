var express = require("express");
var router = express.Router();

// I was using this file as an example
/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send(`${2 * req.query.number}`);
});

module.exports = router;
