import React from "react";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export const CompletedTasksButtons = ({ openModal, task, onDeleteTask }) => {
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
      </span>
      <button onClick={() => openModal(task)} className="titleButton">
        {task.title}
      </button>
    </td>
  );
};
