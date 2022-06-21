const Workout = require("../models/workoutModel");

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
    const selectedWorkout = await Workout.findById(req.params.id);
    const results = await selectedWorkout.remove();
    res.json({
      mssg: "delete requested workouts!!",
      results,
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
    const results = await Workout.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mssg: "update requested on workouts", results });
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
