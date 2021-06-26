import React from "react";
import { getActiveData } from "../../../redux/actions";
import { useDispatch } from "react-redux";

export const CheckAllActiveTasks = ({ activeTasks }) => {
  const dispatch = useDispatch();
  return (
    <th>
      <input
        type="checkbox"
        onChange={(e) => {
          let value = e.target.checked;
          dispatch(
            getActiveData(
              activeTasks.map((d) => {
                d.select = value;
                return d;
              })
            )
          );
        }}
      />
      <span>Check all</span>
    </th>
  );
};
