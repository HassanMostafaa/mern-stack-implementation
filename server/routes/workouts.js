const express = require("express");
const router = express.Router();
const {
  createNewWorkout,
  getAll,
  getSingleById,
  deleteSingleWorkoutById,
  updateWorkoutById,
} = require("../controllers/wourkoutsControllers");

router.get("/", getAll);

router.get("/:id", getSingleById);

router.post("/", createNewWorkout);

router.delete("/:id", deleteSingleWorkoutById);

router.patch("/:id", updateWorkoutById);

module.exports = router;
