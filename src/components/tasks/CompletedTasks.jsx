import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";

export const CompletedTasks = memo(({ task, onToggleStatus, openModal }) => {
  return (
    <Card className="cards">
      <div onClick={() => openModal(task)} className="card-body__button">
        <span className="card-body__title">{task.title}</span>
      </div>

      <CardActions style={{ marginTop: "45px" }}>
        <button
          className="btn btn-success btn-sm "
          onClick={() => onToggleStatus(task, false)}
        >
          To active
        </button>
      </CardActions>
    </Card>
  );
});
