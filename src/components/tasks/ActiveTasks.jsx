import React from "react";
import { NavLink } from "react-router-dom";

export const ActiveTasks = React.memo(
  ({
    task,
    setIsChecked,
    activeTasks,
    openModal,
    onDeleteTask,
    onToggleStatus,
  }) => {
    return (
      <div className="card" key={task.id}>
        <div className="card-body card-body__inner ">
          <input
            type="checkbox"
            checked={task.checked}
            onChange={(e) => {
              let value = e.target.checked;
              setIsChecked(
                activeTasks.map((sd) => {
                  if (sd.id === task.id) {
                    sd.checked = value;
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
              onClick={() => onToggleStatus(task, true)}
            >
              Complete
            </button>
          </span>
        </div>
      </div>
    );
  }
);
