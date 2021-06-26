import React from "react";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

export const ActiveTaskRow = ({
  openModal,
  onDeleteTask,
  setActiveTasks,
  onCompleteHandler,
  activeTasks,
  isHovered,
  setIsHovered,
}) => {
  return (
    <>
      {activeTasks.map((task) => {
        return (
          <tr key={task.id}>
            <td>
              <input
                type="checkbox"
                checked={task.select}
                onChange={(e) => {
                  let value = e.target.checked;
                  setActiveTasks(
                    activeTasks.map((sd) => {
                      if (sd.id === task.id) {
                        sd.select = value;
                      }
                      return sd;
                    })
                  );
                }}
              />
            </td>

            <td colSpan="2" className="hoveredButton">
              <button
                onClick={() => openModal(task)}
                className="titleButton"
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {task.title}

                {isHovered && (
                  <>
                    <NavLink
                      to={{ pathname: `/edit/${task.id}`, state: { task } }}
                    >
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
          </tr>
        );
      })}
    </>
  );
};