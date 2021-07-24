import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";

export const AddTaskButton = ({ handleClickOpen }) => {
  return (
    <Link to={routes.ADD_TASK}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ backgroundColor: "green", marginLeft: "15px" }}
      >
        Add task
      </Button>
    </Link>
  );
};
