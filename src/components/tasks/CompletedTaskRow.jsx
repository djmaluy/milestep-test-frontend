import React from "react";
import { NavLink } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Button from "@material-ui/core/Button";

export const CompletedTaskRow = ({
  openModal,
  onDeleteTask,
  completedTasks,
  setCompletedTasks,
  onMooveToActiveHandler,
}) => {
  return (
    <>
      {completedTasks.map((task) => {
        return (
          <tr key={task.id}>
            <td>
              <input
                type="checkbox"
                checked={task.select}
                onChange={(e) => {
                  let value = e.target.checked;
                  setCompletedTasks(
                    completedTasks.map((sd) => {
                      if (sd.id === task.id) {
                        sd.select = value;
                      }
                      return sd;
                    })
                  );
                }}
              />
            </td>

            <td colSpan="2">
              <button onClick={() => openModal(task)} className="titleButton">
                {task.title}
              </button>
              <Button
                onClick={() => onMooveToActiveHandler(task)}
                color="primary"
                variant="contained"
                size="small"
              >
                To active
              </Button>
            </td>
            <td>
              <NavLink to={{ pathname: `/edit/${task.id}`, state: { task } }}>
                <EditOutlinedIcon />
              </NavLink>
              <DeleteForeverIcon
                onClick={() => onDeleteTask(task.id)}
                className="deleteButton"
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};
