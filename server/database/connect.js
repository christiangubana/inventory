const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();

  mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "testingDb",
  });
  console.log(`MongoDB successfully connected to ${mongoURL}`);
};

module.exports = connect;