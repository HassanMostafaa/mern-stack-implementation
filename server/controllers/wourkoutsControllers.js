const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//get all workouts
const getAll = async (req, res) => {
  try {
    // sort by created at with decending order meaning newest one at the top
    const resutls = await Workout.find({}).sort({ createdAt: -1 });
    res.json({ request: "Fetch request to All Workouts in DB", resutls });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// get single workout
const getSingleById = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id) || !workout) {
      return res.status(404).json({ error: `No workout Found. Invalid Id ` });
    }
    res.json({
      request: "Request a single workout from DB with /:id param",
      query: req.params,
      results: workout,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create new
const createNewWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  !title && emptyFields.push("title");
  !load && emptyFields.push("load");
  !reps && emptyFields.push("reps");
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: " Please, Fill in all the forms ", emptyFields });
  }

  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
    });
    res.status(200).json({ request: "Post request to a new workout", workout });
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
      request: "delete request!!",
      query: req.params,
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
    const workout = await Workout.findByIdAndUpdate({ _id: id }, req.body);
    if (!mongoose.Types.ObjectId.isValid(id) || !workout) {
      return res.status(404).json({ error: `No workout Found. Invalid Id ` });
    }
    res.status(200).json({
      request:
        "update request to a single workout with /:id param and a new body values",
      query: { params: req.params, body: req.body },
      results: workout,
    });
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
