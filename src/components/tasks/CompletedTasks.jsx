import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

export const CompletedTasks = memo(({ task, onToggleStatus, openModal }) => {
  return (
    <Card className="cards">
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <button onClick={() => openModal(task)} className="titleButton">
              <span className="card-body__inner--title">{task.title}</span>
            </button>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <button
          className="btn btn-success btn-sm"
          onClick={() => onToggleStatus(task, false)}
        >
          To active
        </button>
      </CardActions>
    </Card>
  );
});
