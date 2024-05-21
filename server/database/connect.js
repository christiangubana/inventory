const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoURL = mongoServer.getUri();

  const uri = process.env.MONGODB_URI || mongoURL
  mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "testingDb",
  });
  console.log(`MongoDB successfully connected to ${uri}`);
};

module.exports = connect;