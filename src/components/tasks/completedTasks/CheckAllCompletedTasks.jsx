import React from "react";
import { useDispatch } from "react-redux";
import { getCompletedData } from "../../../redux/actions";

export const CheckAllCompletedTasks = ({ task, completedTasks }) => {
  const dispatch = useDispatch();
  return (
    <td>
      <input
        type="checkbox"
        checked={task.select}
        onChange={(e) => {
          let value = e.target.checked;
          dispatch(
            getCompletedData(
              completedTasks.map((sd) => {
                if (sd.id === task.id) {
                  sd.select = value;
                }
                return sd;
              })
            )
          );
        }}
      />
    </td>
  );
};
