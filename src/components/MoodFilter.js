import React from "react";
import "./MoodFilter.css";

function MoodFilter({ setFilter }) {
  return (
    <div className="mood-container">
      <h2>What's Your Mood Today?</h2>
      <div className="mood-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("party")}>🔥 Party</button>
        <button onClick={() => setFilter("romantic")}>😍 Romantic</button>
        <button onClick={() => setFilter("family")}>👨‍👩‍👧 Family</button>
        <button onClick={() => setFilter("gaming")}>🎮 Gaming</button>
      </div>
    </div>
  );
}

export default MoodFilter;