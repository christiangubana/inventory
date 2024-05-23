const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  let uri = process.env.MONGODB_URI;

  // Check if we're running in a Docker container
  if (!uri) {
    if (process.env.NODE_ENV === "docker") {
      uri = "mongodb://mongo:27017/testingDb";
    } else {
      uri = "mongodb://localhost:27017/testingDb";
    }
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "testingDb",
    });
    console.log(`MongoDB successfully connected to ${uri}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connect;
