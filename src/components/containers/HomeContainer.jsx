import React, { useState, useEffect } from "react";
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
import { AddTaskModal } from "../../modal/AddTaskModal";
import api from "../../api/api";

const HomeContainer = ({
  sortedTasks,
  formik,
  handleSubmit,
  handleClickOpen,
  handleClose,
  open,
  onDeleteTask,
  current_user,
}) => {
  const [showTask, setShowTask] = useState(null);
  const [, setIsChecked] = useState(false);

  const activeTasks = useSelector(getActiveTasks);
  const completedTasks = useSelector(getCompletedTasks);
  const dispatch = useDispatch();

  // By marking task as completed a particular task moves to appropriate list
  const onToggleStatus = async (task, value) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: value });
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
  //  Batch deleting  tasks
  const deleteTasksById = () => {
    const ids = [];
    sortedTasks.forEach((d) => {
      if (d.checked) {
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
        {current_user ? (
          <>
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
                      onToggleStatus={onToggleStatus}
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
                      onToggleStatus={onToggleStatus}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <h2 className="not_authorized">You are not authorized!</h2>
        )}
      </div>
      <>
        {showTask && (
          <AddTaskModal showTask={showTask} closeModal={closeModal} />
        )}
      </>
    </>
  );
};

export default HomeContainer;
