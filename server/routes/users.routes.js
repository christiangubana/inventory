const usersController = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-profile", usersController.userProfile);
router.get("/users", usersController.getAllUsers); // New route to fetch all users

module.exports = router;
