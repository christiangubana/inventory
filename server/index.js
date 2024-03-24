const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const { unless } = require("express-unless");

//PORT config
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

  //Enable CORS for all the routes
  app.use(cors());

  auth.authenticateToken.unless = unless;
  app.use(
    auth.authenticateToken.unless({
      path: [
        { url: "/users/login", methods: ["POST"] },
        { url: "/users/register", methods: ["POST"] },
      ],
    })
  );

  app.use(express.json());

  // initialize routes
  app.use("/users", require("./routes/users.routes"));
  app.use("/foods", require("./routes/food.routes")); // Add this line to integrate food routes

  app.use(errors.errorHandler);
  
  // listen for requests
  app.listen(process.env.port || PORT, function () {
    console.log("Ready to Go!");
    console.log(`Server is running on port ${PORT}`);
  });
