// controllers/food.controller.js
const Food = require("../models/food.model");

exports.addFood = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    const food = new Food({ title, description, image });
    await food.save();
    res.status(201).json({ message: "Food item added successfully", food });
  } catch (error) {
    next(error);
  }
};

exports.updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json({ message: "Food item updated successfully", food: updatedFood });
  } catch (error) {
    next(error);
  }
};

exports.deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
