import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

export const CompletedTasks = memo(
  ({ task, useStyles, onToggleStatus, openModal }) => {
    const classes = useStyles();
    return (
      <Grid item key={task.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <button onClick={() => openModal(task)} className="titleButton">
              <span className="card-body__inner--title">{task.title}</span>
            </button>
          </CardContent>
          <CardActions>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => onToggleStatus(task, false)}
            >
              To active
            </button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
);
