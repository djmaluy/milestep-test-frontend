import React from "react";
import { NavLink } from "react-router-dom";

export const ActiveTasks = ({
  task,
  setIsChecked,
  activeTasks,
  openModal,
  onCompleteHandler,
  onDeleteTask,
}) => {
  return (
    <div className="card" key={task.id}>
      <div className="card-body card-body__inner ">
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
        <button onClick={() => openModal(task)} className="titleButton">
          <span className="card-body__inner--title">{task.title}</span>
        </button>
        <span className="deleteEditButtons">
          <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
            <button type="button" className="btn btn-info">
              Edit
            </button>
          </NavLink>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteTask(task.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() => onCompleteHandler(task)}
          >
            Complete
          </button>
        </span>
      </div>
    </div>
  );
};
