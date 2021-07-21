import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActiveTasks } from "../tasks/ActiveTasks";
import { CompletedTasks } from "../tasks/CompletedTasks";
import { HomePageButtons } from "../HomePageButtons";
import { AddTaskModal } from "../../modal/AddTaskModal";
import api from "../../api/api";
import { fetchTasks } from "../../store/routines";
import { getLoading } from "../../redux/tasksSelector";
import CircularProgress from "@material-ui/core/CircularProgress";

export const HomeContainer = ({
  tasks,
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
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const loading = useSelector(getLoading);

  const dispatch = useDispatch();

  // By marking task as completed a particular task moves to appropriate list
  const onToggleStatus = async (task, value) => {
    const response = await api.put(`/tasks/${task.id}`, { is_done: value });
    dispatch(
      fetchTasks(
        tasks.map((task) => {
          return task.id === response.data.id ? { ...response.data } : task;
        })
      )
    );
  };

  const getCompletedTasks = useCallback(() => {
    if (tasks) {
      const completedTasks = tasks.filter((task) => {
        return task.is_done === true;
      });
      setCompletedTasks(completedTasks);
    }
  }, [tasks]);

  const getActiveTasks = useCallback(() => {
    if (tasks) {
      const activeTasks = tasks.filter((task) => {
        return task.is_done === false;
      });
      setActiveTasks(activeTasks);
    }
  }, [tasks]);

  useEffect(() => {
    getCompletedTasks();
    getActiveTasks();
  }, [getCompletedTasks, getActiveTasks]);

  const openModal = (task) => {
    setShowTask(task);
  };
  const closeModal = () => {
    setShowTask(null);
  };
  //  Batch deleting  tasks
  const deleteTasksByIds = () => {
    const ids = [];
    tasks.forEach((d) => {
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
      .then(() => {
        dispatch(fetchTasks());
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="tasksTables container ">
        <h1 className="home__title">Task management system</h1>
        {!current_user ? (
          <h2 className="not_authorized">You are not authorized!</h2>
        ) : (
          <>
            <div>
              <div className="d-flex">
                <HomePageButtons
                  deleteTasksByIds={deleteTasksByIds}
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
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div className="col-sm-6">
                <h3 className="list__title">Completed tasks</h3>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </>
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
