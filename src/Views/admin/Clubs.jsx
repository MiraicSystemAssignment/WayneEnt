import React from "react";
import "./Clubs.css";
const clubs = ["club-name", "club-name_1", "club-name_2"];

export const Clubs = () => {
  return clubs.map((club) => (
    <div key={club} className="clubs-container">
      <h3 className="club-title"> {club}</h3>
      <button className="club-button">Delete</button>
    </div>
  ));
};
