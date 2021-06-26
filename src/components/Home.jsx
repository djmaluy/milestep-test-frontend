import React from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import api from "../api/api";
import { CompletedTasks } from "./tasks/completedTasks/CompletedTasks";
import { ActiveTasks } from "./tasks/activeTasks/ActiveTasks";
import { AddTaskModal } from "./AddTaskModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/actions";

export const Home = ({
  sortedTasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  onDeleteTask,
  setTasks,
}) => {
  const [showTask, setShowTask] = useState(null);
  const dispatch = useDispatch();

  const onCompleteHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: true });

    dispatch(
      fetchData(
        sortedTasks.map((task) => {
          return task.id === response.data.id ? { ...response.data } : task;
        })
      )
    );
    fetchData();
  };

  const onMooveToActiveHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: false });
    dispatch(
      fetchData(
        sortedTasks.map((task) => {
          return task.id === response.data.id ? { ...response.data } : task;
        })
      )
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
        />
      </div>
      <div>
        <CompletedTasks
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          deleteTasksById={deleteTasksById}
          onMooveToActiveHandler={onMooveToActiveHandler}
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
