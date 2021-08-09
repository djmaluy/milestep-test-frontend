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
import { SearchBar } from "../searchBar/SearchBar";

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
  const [term, setTerm] = useState("");
  const [filteredData, setFilteredData] = useState(activeTasks);
  const [debouncedTerm, setDebouncedTerm] = useState(term);

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
    dispatch(deleteMoreTasks(ids));
  };

  // Search tasks by title
  const filterDataByTitle = useCallback(
    (term) => {
      if (tasks) {
        const newDataArray = tasks.filter((task) =>
          task.title.toLowerCase().includes(term)
        );
        return setFilteredData(newDataArray);
      }
    },
    [tasks]
  );

  useEffect(() => {
    filterDataByTitle(term);
  }, [term, filterDataByTitle]);

  // update term value after 1 second from the last update of debouncedTerm
  useEffect(() => {
    const timer = setTimeout(() => setTerm(debouncedTerm), 2000);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  return (
    <>
      {current_user ? (
        <>
          <div className="active_tasks__buttons">
            <div className="home__checkAll">
              <CheckAllTasks
                setIsChecked={setIsChecked}
                activeTasks={activeTasks}
              />
            </div>
            <BatchDeleteButton deleteTasksByIds={deleteTasksByIds} />
            <SearchBar
              setDebouncedTerm={setDebouncedTerm}
              debouncedTerm={debouncedTerm}
            />
          </div>
          <div className="tasks_columns">
            <div className="active_tasks__column">
              <h4 className="tasks_columns-title">Active tasks</h4>

              {filteredData.map((task) => (
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
        </>
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
