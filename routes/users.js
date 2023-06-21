var express = require("express");
var router = express.Router();
const UserController = require("../controller/user.controller");

/* GET users listing. */
router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.get("/", UserController.GetAllUser);
router.get("/:id", UserController.GetUser);
router.put("/", UserController.UpdatePassword);
router.delete("/:id", UserController.DeleteAccount);

module.exports = router;
