import React from "react";

export const CompletedTasks = ({ task, openModal, onMooveToActiveHandler }) => {
  return (
    <div className="card" key={task.id}>
      <div className="card-body card-body__inner ">
        <button onClick={() => openModal(task)} className="titleButton">
          <span className="card-body__inner--title">{task.title}</span>
        </button>

        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => onMooveToActiveHandler(task)}
        >
          To active
        </button>
      </div>
    </div>
  );
};
