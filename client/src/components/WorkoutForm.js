import React, { useState, useEffect } from "react";

export const WorkoutForm = ({ fetchWorkouts }) => {
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
    console.log(res);
    if (!res.ok) {
      setError({ err: json.error });
    }
    if (res.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("new workout added:", json);
      fetchWorkouts();
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
