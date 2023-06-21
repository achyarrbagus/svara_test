var express = require("express");
var router = express.Router();
const CityController = require("../controller/city.controller");

/* GET city listing. */
router.post("/", CityController.CreateCity);
router.get("/", CityController.GetAllCity);

module.exports = router;
