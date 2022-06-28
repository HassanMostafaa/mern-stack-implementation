import React, { useState } from "react";
import { useWorkoutContext } from "./../hooks/useWorkoutContext";

export const WorkoutForm = ({ fetchWorkouts }) => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

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
    console.log("Response.Ok: ", res.ok, "Status:", res.status);
    if (!res.ok) {
      setError({ err: json.error });
    }
    if (res.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
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
      />
      <label htmlFor="">Load in (KG): </label>
      <input
        type="text"
        name=""
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <label htmlFor="">Reps: </label>
      <input
        type="number"
        name=""
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <button>Add Workout</button>
      {error && <div>{error.err}</div>}
    </form>
  );
};
