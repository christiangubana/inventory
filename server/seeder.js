// seed.js
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Food = require("./models/food.model");
const bcrypt = require("bcryptjs");

const seedData = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://mongo:27017/testingDb";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear existing data
  await User.deleteMany({});
  await Food.deleteMany({});

  // Create a test user
  const salt = bcrypt.genSaltSync(10);
  const testUser = new User({
    username: "testuser",
    email: "testuser@example.com",
    password: bcrypt.hashSync("password", salt),
  });
  await testUser.save();

  // Create some test food items
  const foods = [
    {
      title: "Apple",
      quantity: "10",
      description: "Fresh apples",
      image: "http://example.com/apple.jpg",
    },
    {
      title: "Banana",
      quantity: "20",
      description: "Fresh bananas",
      image: "http://example.com/banana.jpg",
    },
  ];

  for (const food of foods) {
    const foodItem = new Food(food);
    await foodItem.save();
  }

  console.log("Seed data inserted");
  mongoose.disconnect();
};

seedData().catch((err) => console.error(err));
