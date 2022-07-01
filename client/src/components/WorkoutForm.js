import React, { useState } from "react";
import { useWorkoutContext } from "./../hooks/useWorkoutContext";

export const WorkoutForm = ({ fetchWorkouts }) => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();

    if (!res.ok) {
      setEmptyFields(json.emptyFields);
      setError(json.error);
    }
    if (res.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("new workout added:", json);
      // fetchWorkouts()
      dispatch({ type: "CREATE_WORKOUT", payload: json.workout });
    }
  };

  return (
    <form action="" className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>
      <label htmlFor="">Title: </label>
      <input
        type="text"
        name=""
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="">Load in (KG): </label>
      <input
        type="text"
        name=""
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label htmlFor="">Reps: </label>
      <input
        type="number"
        name=""
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
