import React from "react";
import "../searchBar/SearchBar.css";

export const SearchBar = ({ debouncedTerm, setDebouncedTerm }) => {
  return (
    <div className="searchbar">
      <input
        className="searchbar-input"
        type="text"
        placeholder="Search task by title . ."
        onChange={(e) => setDebouncedTerm(e.target.value)}
        value={debouncedTerm}
      />
    </div>
  );
};
