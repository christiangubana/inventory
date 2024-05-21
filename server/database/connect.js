const mongoose = require("mongoose");

const connect = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "testingDb",
  });
  console.log(`MongoDB successfully connected to ${uri}`);
};

module.exports = connect;
