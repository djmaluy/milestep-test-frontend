import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHover } from "../../../redux/actions";
import { getIsHovered } from "../../../redux/tasksSelector";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

export const CompletedTasksButtons = ({ openModal, task, onDeleteTask }) => {
  const dispatch = useDispatch();
  const isHovered = useSelector(getIsHovered);
  return (
    <td colSpan="2" className="hoveredButton">
      <button
        onClick={() => openModal(task)}
        className="titleButton"
        onMouseOver={() => dispatch(changeHover(true))}
        onMouseLeave={() => dispatch(changeHover(false))}
      >
        {task.title}

        {isHovered && (
          <>
            <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
              <EditOutlinedIcon />
            </NavLink>
            <DeleteForeverIcon
              onClick={() => onDeleteTask(task.id)}
              className="deleteButton"
            />
          </>
        )}
      </button>
    </td>
  );
};
