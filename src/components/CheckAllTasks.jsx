import React from "react";

export const CheckAllTasks = ({ activeTasks, setIsChecked }) => {
  return (
    <>
      <input
        className="checkbox__input"
        type="checkbox"
        onChange={(e) => {
          let value = e.target.checked;
          setIsChecked(
            activeTasks.map((d) => {
              d.checked = value;
              return d;
            })
          );
        }}
      />
      <span className="home__checkAll-text">Check all</span>
    </>
  );
};
