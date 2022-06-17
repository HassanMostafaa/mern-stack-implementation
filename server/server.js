const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");

// FOR HASHING PASSWORDS IN THE FUTURE
// const bcrypt = require("bcrypt");
//const saltRounds = 10;

//express app
const app = express();
const port = process.env.PORT || 3000;

console.log("git?");

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);

app.listen(port, () => {
  console.log("running ON", port);
});
