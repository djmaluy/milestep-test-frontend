import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Fab from "@material-ui/core/Fab";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

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
      <Card className="cards">
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <input
                className="checkbox__input"
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
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
            <Fab color="primary" size="small">
              <EditOutlinedIcon />
            </Fab>
          </NavLink>
          <Fab
            color="secondary"
            size="small"
            onClick={() => onDeleteTask(task.id)}
          >
            <DeleteIcon />
          </Fab>
          <Fab
            size="small"
            onClick={() => onToggleStatus(task, true)}
            style={{ background: "green", color: "white" }}
          >
            <CheckCircleOutlineIcon />
          </Fab>
        </CardActions>
      </Card>
    );
  }
);
