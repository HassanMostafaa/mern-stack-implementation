const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//get all workouts
const getAll = async (req, res) => {
  try {
    // sort by created at with decending order meaning newest one at the top
    const resutls = await Workout.find({}).sort({ createdAt: -1 });
    res.json({ mssg: "workout router get requested", resutls });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// get single workout
const getSingleById = async (req, res) => {
  try {
    const results = await Workout.findById(req.params.id);
    res.json({
      mssg: "requested single workout /:id",
      query: req.params,
      results,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create new
const createNewWorkout = async (req, res) => {
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
};

// delete
const deleteSingleWorkoutById = async (req, res) => {
  try {
    //const selectedWorkout = await Workout.findById(req.params.id);
    // const results = await selectedWorkout.remove();
    const { id } = req.params;
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!mongoose.Types.ObjectId.isValid(id) || !workout) {
      return res.status(404).json({ error: `No workout Found. Invalid Id ` });
    }
    res.status(200).json({
      mssg: "delete requested workouts!!",
      results: workout,
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: `No workout Found. Invalid Id, ${error.message} ` });
  }
};
// update
const updateWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(404).json({ error: `No workout Found. Invalid Id ` });
    // }
    const workout = await Workout.findByIdAndUpdate({ _id: id }, req.body);
    if (!mongoose.Types.ObjectId.isValid(id) || !workout) {
      return res.status(404).json({ error: `No workout Found. Invalid Id ` });
    }
    res
      .status(200)
      .json({ mssg: "update requested on workouts", results: workout });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createNewWorkout,
  getAll,
  getSingleById,
  deleteSingleWorkoutById,
  updateWorkoutById,
};
