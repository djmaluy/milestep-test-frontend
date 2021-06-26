import React from "react";
import { CompletedTaskRow } from "./CompletedTaskRow";

export const CompletedTasks = ({
  openModal,
  onDeleteTask,
  tasks,
  setCompletedTasks,
  completedTasks,
  onMooveToActiveHandler,
  setIsHovered,
  isHovered,
}) => {
  return (
    <div className="completedTasks">
      <h3>Completed tasks</h3>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  let value = e.target.checked;
                  setCompletedTasks(
                    completedTasks.map((d) => {
                      d.select = value;
                      return d;
                    })
                  );
                }}
              />
              <span>Check all</span>
            </th>
            <th colSpan="2">Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CompletedTaskRow
            openModal={openModal}
            onDeleteTask={onDeleteTask}
            tasks={tasks}
            setCompletedTasks={setCompletedTasks}
            completedTasks={completedTasks}
            onMooveToActiveHandler={onMooveToActiveHandler}
            setIsHovered={setIsHovered}
            isHovered={isHovered}
          />
        </tbody>
      </table>
    </div>
  );
};
