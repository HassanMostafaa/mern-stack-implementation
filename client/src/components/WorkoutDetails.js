//import axios from "axios";
import { motion } from "framer-motion";
import { useWorkoutContext } from "./../hooks/useWorkoutContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout, fetchWorkouts, ix }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async (id) => {
    const res = await fetch(`/api/workouts/${id}`, { method: "DELETE" });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <motion.div
      layout
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: (ix + 1) * 0.1 }}
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
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span
        className="material-symbols-outlined"
        onClick={() => handleClick(workout._id)}
      >
        Delete
      </span>
    </motion.div>
  );
};

export default WorkoutDetails;
