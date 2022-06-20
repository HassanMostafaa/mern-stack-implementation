const express = require("express");
const Workout = require("../models/workoutModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "workout router get requested" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "requested single workout /:id", query: req.params });
});

router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // res.json({ mssg: "post requested on workout", body: req.body });
});

router.delete("/:id", (req, res) => {
  res.json({ mssg: "delete requested workouts!!" });
});

router.patch("/:id", (req, res) => {
  res.json({ mssg: "update requested on workouts" });
});

module.exports = router;
