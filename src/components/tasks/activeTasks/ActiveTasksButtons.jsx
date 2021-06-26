import React from "react";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getIsHovered } from "../../../redux/tasksSelector";
import { changeHover } from "../../../redux/actions";

export const ActiveTasksButtons = ({
  openModal,
  task,
  onDeleteTask,
  onCompleteHandler,
}) => {
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
      <CheckCircleOutlinedIcon
        className="completedButton"
        onClick={() => onCompleteHandler(task)}
      />
    </td>
  );
};
