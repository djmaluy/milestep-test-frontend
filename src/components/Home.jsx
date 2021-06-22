import React from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

export const Home = ({ user, tasks, formik, handleSubmit }) => {
  return (
    <div>
      <h1 className="mt-4">
        {user ? (
          <>
            <div className="text-center">
              Hello, {user.first_name} {user.last_name}
            </div>
          </>
        ) : (
          "You are not logged in"
        )}
      </h1>

      <div className="myTasks">
        <>
          <h2>All tasks</h2>
          <ul className="list-group ">
            {tasks.map((task) => {
              return (
                <li className="list-group-item col-5" key={task.id}>
                  {task.title}
                  <ButtonGroup color="primary" size="small">
                    <Button href="#text-buttons" color="primary">
                      Edit
                    </Button>
                    <Button href="#text-buttons" color="primary">
                      Delete
                    </Button>
                  </ButtonGroup>
                </li>
              );
            })}
          </ul>
        </>
      </div>
      <AddTaskForm handleSubmit={handleSubmit} formik={formik} />
    </div>
  );
};
