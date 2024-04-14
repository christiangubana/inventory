const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const { unless } = require("express-unless");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI || dbConfig;

mongoose.Promise = global.Promise;
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},6000000)
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

// Enable CORS for all routes
app.use(cors());

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

app.use(express.json());

// Initialize routes
app.use("/api", require("./routes/users.routes"));
app.use("/api/foods", require("./routes/food.routes")); // Prefix with /api for food routes
app.use(express.static("uploads"));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errors.errorHandler);

// Listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
