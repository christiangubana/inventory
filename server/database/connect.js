const mongoose = require("mongoose");

const connect = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/testingDb";
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
