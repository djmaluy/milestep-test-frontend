import React from "react";
import { TaskRow } from "./TaskRow";

export const CompletedTasks = ({
  openModal,
  onDeleteTask,
  tasks,
  setTasks,
  // deleteTasksById,
}) => {
  return (
    <>
      <table className="table table-bordered table-auto ml-5">
        <thead>
          <tr className="d-flex">
            <th className="col-3">
              <input
                type="checkbox"
                onChange={(e) => {
                  let value = e.target.checked;
                  setTasks(
                    tasks.map((d) => {
                      d.select = value;
                      return d;
                    })
                  );
                }}
              />
              <span>check all/uncheck all</span>
            </th>
            <th className="col-5">Title</th>
          </tr>
        </thead>
        <tbody>
          <TaskRow
            openModal={openModal}
            onDeleteTask={onDeleteTask}
            tasks={tasks}
            setTasks={setTasks}
          />
        </tbody>
      </table>
    </>
  );
};
