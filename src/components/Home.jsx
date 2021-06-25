import React, { useState, useEffect } from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import { TaskDetail } from "./tasks/TaskDetail";
import api from "../api/api";
import { CompletedTasks } from "./tasks/CompletedTasks";
import { ActiveTasks } from "./tasks/ActiveTasks";

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
  const [showTask, setShowTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);

  const getCompletedTasks = () => {
    const result = tasks.filter((task) => {
      return task.is_done === true;
    });
    setCompletedTasks(result);
  };
  const getActiveTasks = () => {
    const result = tasks.filter((task) => {
      return task.is_done === false;
    });
    setActiveTasks(result);
  };

  useEffect(() => {
    getCompletedTasks();
    getActiveTasks();
  }, [tasks]);

  const onCompleteHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: true });

    setTasks(
      tasks.map((task) => {
        return task.id === response.data.id ? { ...response.data } : task;
      })
    );
    fetchData();
  };
  const onMooveToActiveHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: false });
    setTasks(
      tasks.map((task) => {
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
    tasks.forEach((d) => {
      if (d.select) {
        ids.push(d.id);
      }
    });

    api
      .delete(`/tasks/${ids}`)
      .then((data) => {
        fetchData();
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="d-flex">
      <div>
        <h3>Active tasks</h3>
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
          tasks={activeTasks}
          setTasks={setTasks}
          deleteTasksById={deleteTasksById}
          formik={formik}
          handleSubmit={handleSubmit}
          handleClickOpen={onCompleteHandler}
          handleClose={handleClose}
          onCompleteHandler={onCompleteHandler}
        />
      </div>
      <div>
        <CompletedTasks
          openModal={openModal}
          onDeleteTask={onDeleteTask}
          tasks={completedTasks}
          setTasks={setTasks}
          deleteTasksById={deleteTasksById}
          onMooveToActiveHandler={onMooveToActiveHandler}
        />
      </div>

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
