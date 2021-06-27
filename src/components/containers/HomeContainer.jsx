import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { AddTaskModal } from "../../modal/AddTaskModal";
import { useDispatch } from "react-redux";
import {
  fetchData,
  getActiveData,
  getCompletedData,
} from "../../redux/actions";
import { getActiveTasks, getCompletedTasks } from "../../redux/tasksSelector";
import { useSelector } from "react-redux";
import { ActiveTasks } from "../tasks/ActiveTasks";
import { CompletedTasks } from "../tasks/CompletedTasks";
import { HomePageButtons } from "../HomePageButtons";

const HomeContainer = ({
  sortedTasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  onDeleteTask,
}) => {
  const [showTask, setShowTask] = useState(null);
  const [, setIsChecked] = useState(false);

  const activeTasks = useSelector(getActiveTasks);
  const completedTasks = useSelector(getCompletedTasks);

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

  useEffect(() => {
    dispatch(getActiveData());
    dispatch(getCompletedData());
  }, [sortedTasks, dispatch]);

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

    api
      .delete(`/tasks/`, {
        data: {
          ids: ids,
        },
      })
      .then((data) => {
        dispatch(fetchData());
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div className="tasksTables container ">
        <h1 className="home__title">Task management system</h1>
        <div>
          <div className="d-flex">
            <HomePageButtons
              deleteTasksById={deleteTasksById}
              handleSubmit={handleSubmit}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              open={open}
              formik={formik}
              activeTasks={activeTasks}
              setIsChecked={setIsChecked}
            />
          </div>
        </div>
        <>
          {showTask && (
            <AddTaskModal showTask={showTask} closeModal={closeModal} />
          )}
        </>
        <div className="row">
          <div className="col-sm-6">
            <h3 className="list__title">Active tasks</h3>
            {activeTasks.map((task) => {
              return (
                <ActiveTasks
                  key={task.id}
                  task={task}
                  setIsChecked={setIsChecked}
                  activeTasks={activeTasks}
                  openModal={openModal}
                  onCompleteHandler={onCompleteHandler}
                  onDeleteTask={onDeleteTask}
                />
              );
            })}
          </div>
          <div className="col-sm-6">
            <h3 className="list__title">Completed tasks</h3>
            {completedTasks.map((task) => {
              return (
                <CompletedTasks
                  key={task.id}
                  task={task}
                  openModal={openModal}
                  onMooveToActiveHandler={onMooveToActiveHandler}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContainer;
