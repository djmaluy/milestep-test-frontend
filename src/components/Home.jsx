import React, { useState } from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import { TaskDetail } from "./tasks/TaskDetail";
import { TaskRow } from "./tasks/TaskRow";
import api from "../api/api";

// import { CompletedTasks } from "./tasks/CompletedTasks";

export const Home = ({
  user,
  tasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  onDeleteTask,
  setOpen,
  setTasks,
  fetchData,
}) => {
  console.log(tasks);
  const [showTask, setShowTask] = useState(null);

  const openModal = (task) => {
    setShowTask(task);
  };
  const closeModal = () => {
    setShowTask(null);
  };
  const deleteTasksById = () => {
    const ids = [];
    tasks.forEach((d) => {
      if (d.select) {
        ids.push(d.id);
      }
    });
    console.log(ids);
    api
      .delete(`/tasks/${ids}`)
      .then((data) => {
        fetchData();
      })
      .catch((err) => alert(err));
  };
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

      <h3>Active tasks</h3>
      <button
        type="button"
        className="btn btn-danger  mb-3"
        onClick={() => {
          deleteTasksById();
        }}
      >
        Batch delete
      </button>
      <div className="d-flex">
        <table className="table table-bordered table-auto">
          <thead>
            <tr className="d-flex">
              <th className="col-3">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    let value = e.target.checked;
                    setTasks(
                      tasks.map((d) => {
                        d.select = value;
                        return d;
                      })
                    );
                  }}
                />
                <span>check all/uncheck all</span>
              </th>
              <th className="col-5">Title</th>
            </tr>
          </thead>
          <tbody>
            <TaskRow
              openModal={openModal}
              onDeleteTask={onDeleteTask}
              tasks={tasks}
              setTasks={setTasks}
            />
          </tbody>
        </table>
        {/* <CompletedTasks
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          tasks={tasks}
          setTasks={setTasks}
          deleteTasksById={deleteTasksById}
        /> */}
      </div>
      <AddTaskForm
        handleSubmit={handleSubmit}
        formik={formik}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
      <div>
        {showTask && (
          <Modal
            isOpen={true}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className="ReactModal__Overlay"
          >
            <div className="ReactModal__Content">
              <Button className="close-modal" onClick={closeModal}>
                X
              </Button>
              <TaskDetail showTask={showTask} />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
