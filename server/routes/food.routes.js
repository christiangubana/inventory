// routes/food.routes.js
const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controllers");


router.get("/", foodController.getAllFood);
router.post("/", foodController.addFood);
router.put("/:id", foodController.updateFood);
router.delete("/:id", foodController.deleteFood);
router.get("/:itemId", foodController.getFoodById);

module.exports = router;
