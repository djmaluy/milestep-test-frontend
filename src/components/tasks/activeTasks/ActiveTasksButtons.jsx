import React from "react";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

export const ActiveTasksButtons = ({
  openModal,
  task,
  onDeleteTask,
  onCompleteHandler,
}) => {
  return (
    <td colSpan="2" className="hoveredButton">
      <span className="deleteEditButtons">
        <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
          <EditOutlinedIcon />
        </NavLink>
        <DeleteForeverIcon
          onClick={() => onDeleteTask(task.id)}
          className="deleteButton"
        />
        <CheckCircleOutlinedIcon
          className="completedButton"
          onClick={() => onCompleteHandler(task)}
        />
      </span>
      <button onClick={() => openModal(task)} className="titleButton ">
        {task.title}
      </button>
    </td>
  );
};
