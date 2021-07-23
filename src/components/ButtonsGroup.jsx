import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export const ButtonsGroup = ({
  onActiveTasksHandler,
  onCompletedTasksHandler,
}) => {
  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button onClick={onActiveTasksHandler}>Active tasks</Button>
      <Button onClick={onCompletedTasksHandler}>Completed tasks</Button>
    </ButtonGroup>
  );
};
