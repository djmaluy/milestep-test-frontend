import React, { memo } from "react";

export const CompletedTasks = memo(({ task, openModal, onToggleStatus }) => {
  return (
    <div className="card" key={task.id}>
      <div className="card-body card-body__inner ">
        <button onClick={() => openModal(task)} className="titleButton">
          <span className="card-body__inner--title">{task.title}</span>
        </button>

        <button
          type="button"
          className="btn btn-success btn-sm"
          onClick={() => onToggleStatus(task, false)}
        >
          To active
        </button>
      </div>
    </div>
  );
});
