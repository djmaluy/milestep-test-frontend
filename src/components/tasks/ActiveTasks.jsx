import React from "react";
import { AddTaskForm } from "./AddTaskForm";
import { TaskRow } from "./TaskRow";

export const ActiveTasks = ({
  openModal,
  onDeleteTask,
  tasks,
  setTasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  fetchData,
  deleteTasksById,
  onCompleteHandler,
}) => {
  return (
    <div>
      <table className="table table-bordered table-auto">
        <thead>
          <tr className="d-flex">
            <th className="col-4">
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
              <span>Check all</span>
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
            fetchData={fetchData}
            onCompleteHandler={onCompleteHandler}
          />
        </tbody>
      </table>
    </div>
  );
};
