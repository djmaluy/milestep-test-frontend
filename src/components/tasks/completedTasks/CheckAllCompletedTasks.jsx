import React from "react";

export const CheckAllCompletedTasks = ({
  task,
  completedTasks,
  setIsChecked,
}) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={task.select}
        onChange={(e) => {
          let value = e.target.checked;
          setIsChecked(
            completedTasks.map((sd) => {
              if (sd.id === task.id) {
                sd.select = value;
              }
              return sd;
            })
          );
        }}
      />
    </td>
  );
};
