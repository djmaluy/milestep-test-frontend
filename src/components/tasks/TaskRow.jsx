import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const TaskRow = ({
  openModal,
  onDeleteTask,
  tasks,
  setTasks,
  onCompleteHandler,
}) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <tr key={task.id} className="d-flex">
            <td className="col-3">
              <input
                type="checkbox"
                checked={task.select}
                onChange={(e) => {
                  let value = e.target.checked;
                  setTasks(
                    tasks.map((sd) => {
                      if (sd.id === task.id) {
                        sd.select = value;
                      }
                      return sd;
                    })
                  );
                }}
              />
            </td>

            <td className="col-5">
              <button onClick={() => openModal(task)} className="titleButton">
                {task.title}
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => onCompleteHandler(task)}
              >
                Complete
              </button>
            </td>
            <td className="col-4">
              <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
                <Button color="primary">Edit</Button>
              </NavLink>
              <Button onClick={() => onDeleteTask(task.id)} color="primary">
                Delete
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
