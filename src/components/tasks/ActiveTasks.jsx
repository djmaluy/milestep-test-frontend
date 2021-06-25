import React from "react";
import { ActiveTaskRow } from "./ActiveTaskRow";

export const ActiveTasks = ({
  openModal,
  onDeleteTask,

  onCompleteHandler,
  activeTasks,
  setActiveTasks,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(e) => {
                let value = e.target.checked;
                setActiveTasks(
                  activeTasks.map((d) => {
                    d.select = value;
                    return d;
                  })
                );
              }}
            />
            <span>Check all</span>
          </th>
          <th colSpan="2">Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <ActiveTaskRow
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          activeTasks={activeTasks}
          onCompleteHandler={onCompleteHandler}
          setActiveTasks={setActiveTasks}
        />
      </tbody>
    </table>
  );
};
