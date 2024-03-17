const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const unless = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    userNewUrlParser: true,
    userUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log(`Database could not be connected ${error}`);
    }
  );

auth.authenticateToken.unless = unless; //Skip middlware when the condition is met.
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

app.use("/users", require("./routes/users.routes"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, () => {
  console.log("Ready to Go!");
});
