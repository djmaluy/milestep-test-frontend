import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActiveTasks } from "../tasks/ActiveTasks";
import { CompletedTasks } from "../tasks/CompletedTasks";
import { AddTaskModal } from "../../modal/AddTaskModal";
import api from "../../api/api";
import { fetchTasks } from "../../store/routines";
// import { getLoading } from "../../redux/tasksSelector";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { BatchDeleteButton } from "../BatchDeleteButton";
import { CheckAllTasks } from "../CheckAllTasks";
import { AddTaskButton } from "../AddTaskButton";

export const HomeContainer = ({
  tasks,
  handleClickOpen,
  onDeleteTask,
  current_user,
}) => {
  const [showTask, setShowTask] = useState(null);
  const [, setIsChecked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [showActiveTasks, setShowActiveTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  // const [image, setImage] = useState(null);

  // const loading = useSelector(getLoading);
  const dispatch = useDispatch();

  // const handleFileUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image);

  //   const response = await api.post("/tasks", formData);
  //   console.log(response);
  // };

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
  const onCompletedTasksHandler = () => {
    setShowCompletedTasks(true);
    setShowActiveTasks(false);
  };
  const onActiveTasksHandler = () => {
    setShowActiveTasks(true);
    setShowCompletedTasks(false);
  };
  return (
    <>
      {current_user ? (
        <div>
          <div className="tasks__switcher">
            <button
              onClick={onActiveTasksHandler}
              className="tasks__switcher-button"
            >
              Active tasks
            </button>
            <button
              onClick={onCompletedTasksHandler}
              className="tasks__switcher-button"
            >
              Completed tasks
            </button>
          </div>
          {showActiveTasks ? (
            <>
              <div className="activeTasks__buttons">
                <div className="home__checkAll">
                  <CheckAllTasks
                    setIsChecked={setIsChecked}
                    activeTasks={activeTasks}
                  />
                </div>
                <BatchDeleteButton deleteTasksByIds={deleteTasksByIds} />
                <AddTaskButton handleClickOpen={handleClickOpen} />
              </div>
              <div className="completedTasks">
                {activeTasks.map((task) => (
                  <ActiveTasks
                    task={task}
                    key={task.id}
                    setIsChecked={setIsChecked}
                    activeTasks={activeTasks}
                    openModal={openModal}
                    onDeleteTask={onDeleteTask}
                    onToggleStatus={onToggleStatus}
                  />
                ))}
              </div>
            </>
          ) : null}
          {showCompletedTasks ? (
            <div className="completedTasks">
              {completedTasks.map((task) => (
                <CompletedTasks
                  key={task.id}
                  task={task}
                  onToggleStatus={onToggleStatus}
                  openModal={openModal}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <h2 className="not_authorized">You are not authorized!</h2>
      )}
      <>
        {showTask && (
          <AddTaskModal showTask={showTask} closeModal={closeModal} />
        )}
      </>
    </>
  );
};
