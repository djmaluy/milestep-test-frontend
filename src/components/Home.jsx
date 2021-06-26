import React from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import api from "../api/api";
import { CompletedTasks } from "./tasks/CompletedTasks";
import { ActiveTasks } from "./tasks/ActiveTasks";
import { AddTaskModal } from "./AddTaskModal";
import { useState } from "react";

export const Home = ({
  sortedTasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  onDeleteTask,
  setTasks,
  fetchData,
}) => {
  const [showTask, setShowTask] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const onCompleteHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: true });

    setTasks(
      sortedTasks.map((task) => {
        return task.id === response.data.id ? { ...response.data } : task;
      })
    );
    fetchData();
  };

  const onMooveToActiveHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: false });
    setTasks(
      sortedTasks.map((task) => {
        return task.id === response.data.id ? { ...response.data } : task;
      })
    );
    fetchData();
  };

  const openModal = (task) => {
    setShowTask(task);
  };
  const closeModal = () => {
    setShowTask(null);
  };
  const deleteTasksById = () => {
    const ids = [];
    sortedTasks.forEach((d) => {
      if (d.select) {
        ids.push(d.id);
      }
    });
    console.log(ids);
    api
      .delete(`/tasks/`, {
        ids: {
          ids,
        },
      })
      .then((data) => {
        fetchData();
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="tasksTables container ">
      <div>
        <div>
          <h3>Active tasks</h3>
        </div>
        <div className="d-flex">
          <button
            type="button"
            className="btn btn-danger  mb-3"
            onClick={() => {
              deleteTasksById();
            }}
          >
            Batch delete
          </button>

          <AddTaskForm
            handleSubmit={handleSubmit}
            formik={formik}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            open={open}
          />
        </div>

        <ActiveTasks
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          deleteTasksById={deleteTasksById}
          onCompleteHandler={onCompleteHandler}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      </div>
      <div>
        <CompletedTasks
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          deleteTasksById={deleteTasksById}
          onMooveToActiveHandler={onMooveToActiveHandler}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />
      </div>

      <>
        {showTask && (
          <AddTaskModal showTask={showTask} closeModal={closeModal} />
        )}
      </>
    </div>
  );
};
