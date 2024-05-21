const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./database/connect.js");

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const { unless } = require("express-unless");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(express.json());

// Configure authentication middleware
auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/api/login", methods: ["POST"] },
      { url: "/api/register", methods: ["POST"] },
    ],
  })
);

// Initialize routes
app.use("/api", require("./routes/users.routes"));
app.use("/api/foods", require("./routes/food.routes"));
app.use(express.static("uploads"));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errors.errorHandler);

const port = process.env.PORT || 8080;
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Can't connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database Connection...!");
  });
