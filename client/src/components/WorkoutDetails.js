//import axios from "axios";
import { motion } from "framer-motion";
import { useWorkoutContext } from "./../hooks/useWorkoutContext";
import { BsTrash } from "react-icons/bs";
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
      // layout
      layout
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: (ix + 1) * 0.2 }}
      className="workout-details"
    >
      <div className="test">
        <span
          className="material-symbols-outlined"
          onClick={() => handleClick(workout._id)}
        >
          {BsTrash()}
        </span>
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
          {formatDistanceToNow(
            new Date(workout.createdAt),
            /*this to say to days (ago)*/ { addSuffix: true }
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default WorkoutDetails;
