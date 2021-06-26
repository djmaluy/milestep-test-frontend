import React from "react";
import Button from "@material-ui/core/Button";
import { CheckAllCompletedTasks } from "./CheckAllCompletedTasks";
import { CompletedTasksButtons } from "./CompletedTasksButtons";

export const CompletedTaskRow = ({
  openModal,
  onDeleteTask,
  onMooveToActiveHandler,
  completedTasks,
  setIsChecked,
}) => {
  return (
    <>
      {completedTasks.map((task) => {
        return (
          <tr key={task.id}>
            <CheckAllCompletedTasks
              task={task}
              completedTasks={completedTasks}
              setIsChecked={setIsChecked}
            />
            <CompletedTasksButtons
              openModal={openModal}
              task={task}
              onDeleteTask={onDeleteTask}
            />
            <td>
              <Button
                onClick={() => onMooveToActiveHandler(task)}
                color="primary"
                variant="contained"
                size="small"
              >
                To active
              </Button>
            </td>
          </tr>
        );
      })}
    </>
  );
};
