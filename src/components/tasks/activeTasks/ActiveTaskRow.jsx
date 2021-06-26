import React from "react";

import { ActiveTasksButtons } from "./ActiveTasksButtons";

export const ActiveTaskRow = ({
  openModal,
  onDeleteTask,
  onCompleteHandler,
  activeTasks,
  setIsChecked,
}) => {
  return (
    <>
      {activeTasks.map((task) => {
        return (
          <tr key={task.id}>
            <td>
              <input
                type="checkbox"
                checked={task.select}
                onChange={(e) => {
                  let value = e.target.checked;
                  setIsChecked(
                    activeTasks.map((sd) => {
                      if (sd.id === task.id) {
                        sd.select = value;
                      }
                      return sd;
                    })
                  );
                }}
              />
            </td>
            <ActiveTasksButtons
              openModal={openModal}
              onDeleteTask={onDeleteTask}
              onCompleteHandler={onCompleteHandler}
              task={task}
            />
          </tr>
        );
      })}
    </>
  );
};
