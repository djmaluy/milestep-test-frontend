import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";

export const CompletedTasks = ({
  openModal,
  onDeleteTask,
  tasks,
  setTasks,
  onMooveToActiveHandler,
}) => {
  return (
    <div>
      <h2>Completed tasks</h2>
      <table className="table table-bordered table-auto ml-5">
        <thead>
          <tr className="d-flex">
            <th className="col-5">Title</th>
          </tr>
        </thead>
        <tbody>
          <>
            {tasks.map((task) => {
              return (
                <tr key={task.id} className="d-flex">
                  <td className="col-5">
                    <button
                      onClick={() => openModal(task)}
                      className="titleButton"
                    >
                      {task.title}
                    </button>
                    <button
                      type="button"
                      className="btn btn-info btn-sm"
                      onClick={() => onMooveToActiveHandler(task)}
                    >
                      To active
                    </button>
                  </td>
                  <td className="col-4">
                    <NavLink
                      to={{ pathname: `/edit/${task.id}`, state: { task } }}
                    >
                      <Button color="primary">Edit</Button>
                    </NavLink>
                    <Button
                      onClick={() => onDeleteTask(task.id)}
                      color="primary"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
    </div>
  );
};
