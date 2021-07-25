import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ActiveTasks } from "../tasks/ActiveTasks";
import { CompletedTasks } from "../tasks/CompletedTasks";
import { AddTaskModal } from "../../modal/AddTaskModal";
import api from "../../api/api";
import { deleteMoreTasks, fetchTasks } from "../../store/routines";
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

  // const [image, setImage] = useState(null);
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
    dispatch(deleteMoreTasks(ids));
  };

  return (
    <>
      <div className="activeTasks__buttons">
        <div className="home__checkAll">
          <CheckAllTasks
            setIsChecked={setIsChecked}
            activeTasks={activeTasks}
          />
        </div>
        <BatchDeleteButton deleteTasksByIds={deleteTasksByIds} />
      </div>
      {current_user ? (
        <div className="tasks_columns">
          <div className="active_tasks__column">
            <h4 className="tasks_columns-title">Active tasks</h4>

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
            <AddTaskButton handleClickOpen={handleClickOpen} />
          </div>

          <div className="completedTasks">
            <h4 className="tasks_columns-title">Completed tasks</h4>
            {completedTasks.map((task) => (
              <CompletedTasks
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                openModal={openModal}
              />
            ))}
          </div>
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
