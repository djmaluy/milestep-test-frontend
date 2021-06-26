import React from "react";

export const CheckAllActiveTasks = ({ activeTasks, setIsChecked }) => {
  return (
    <th>
      <input
        type="checkbox"
        onChange={(e) => {
          let value = e.target.checked;

          setIsChecked(
            activeTasks.map((d) => {
              d.select = value;
              return d;
            })
          );
        }}
      />
      <span>Check all</span>
    </th>
  );
};
