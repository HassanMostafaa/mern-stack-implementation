import axios from "axios";
import { motion } from "framer-motion";

const WorkoutDetails = ({ workout, fetchWorkouts, ix }) => {
  const handleDelete = async (id) => {
    await axios.delete(`/api/workouts/${id}`);
    fetchWorkouts();
  };

  return (
    <motion.div
      layout
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: (ix + 1) * 0.4 }}
      className="workout-details"
    >
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <button onClick={() => handleDelete(workout._id)}>Delete</button>
    </motion.div>
  );
};

export default WorkoutDetails;
