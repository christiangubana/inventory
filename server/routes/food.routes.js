// routes/food.routes.js
const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controllers");

// Route to list all food items
router.get("/", foodController.getAllFood);
router.post("/", foodController.addFood);
router.put("/:id", foodController.updateFood);
router.delete("/:id", foodController.deleteFood);

module.exports = router;
