import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import { WorkoutForm } from "../components/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  const fetchWorkouts = async () => {
    const response = await fetch("/api/workouts");
    const json = await response.json();

    if (response.ok) {
      setWorkouts(json.resutls);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <motion.div layout className="workouts">
        {workouts &&
          workouts.map((workout, ix) => (
            <WorkoutDetails
              workout={workout}
              ix={ix}
              key={workout._id}
              fetchWorkouts={fetchWorkouts}
            />
          ))}
      </motion.div>

      <WorkoutForm fetchWorkouts={fetchWorkouts} />
    </div>
  );
};

export default Home;
