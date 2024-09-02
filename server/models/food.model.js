// models/food.model.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodSchema = new Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  quantity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store URL of the image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;
