const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");


//express app
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);

// connect to db and starting the server
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Connected to DB and running on \nhttp://localhost:${port}\nMain Route\nhttp://localhost:${port}/api/workouts`
      );
    });
  })
  .catch((error) => console.log(error));

// FOR HASHING PASSWORDS IN THE FUTURE
// const bcrypt = require("bcrypt");
//const saltRounds = 10;
