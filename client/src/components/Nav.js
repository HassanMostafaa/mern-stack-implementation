import React from "react";
import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Bud</h1>
        </Link>
      </div>
    </header>
  );
};
