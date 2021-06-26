import React from "react";
import { useDispatch } from "react-redux";
import { getCompletedData } from "../../../redux/actions";
import { ActiveTasksButtons } from "./ActiveTasksButtons";

export const ActiveTaskRow = ({
  openModal,
  onDeleteTask,
  onCompleteHandler,
  activeTasks,
}) => {
  const dispatch = useDispatch();

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
                  dispatch(
                    getCompletedData(
                      activeTasks.map((sd) => {
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
