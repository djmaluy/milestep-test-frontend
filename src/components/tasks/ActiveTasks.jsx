import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Tooltip from "@material-ui/core/Tooltip";

export const ActiveTasks = React.memo(
  ({
    task,
    setIsChecked,
    activeTasks,
    openModal,
    onDeleteTask,
    onToggleStatus,
    useStyles,
  }) => {
    const classes = useStyles();
    return (
      <Grid item key={task.id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
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
          </CardContent>
          <CardActions>
            <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
              <Tooltip title="Edit" placement="top-end">
                <IconButton aria-label="edit" color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
            </NavLink>

            <Tooltip title="Delete" placement="top-end">
              <IconButton
                color="secondary"
                onClick={() => onDeleteTask(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Complete" placement="top-end">
              <IconButton
                color="primary"
                onClick={() => onToggleStatus(task, true)}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    );
  }
);
