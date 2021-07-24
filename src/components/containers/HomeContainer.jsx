import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActiveTasks } from "../tasks/ActiveTasks";
import { CompletedTasks } from "../tasks/CompletedTasks";
import { HomePageButtons } from "../HomePageButtons";
import { AddTaskModal } from "../../modal/AddTaskModal";
import api from "../../api/api";
import { deleteMoreTasks, fetchTasks } from "../../store/routines";
import { getLoading } from "../../redux/tasksSelector";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ButtonsGroup } from "./../../components/ButtonsGroup";

import { NavLink } from "react-router-dom";
import { AddTaskForm } from "../tasks/AddTaskForm";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    minHeight: "150px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

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
  const classes = useStyles();

  const [showTask, setShowTask] = useState(null);
  const [, setIsChecked] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [showActiveTasks, setShowActiveTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  // const [image, setImage] = useState(null);

  const loading = useSelector(getLoading);
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
      <div className="container ">
        <div>
          <ButtonsGroup
            onCompletedTasksHandler={onCompletedTasksHandler}
            onActiveTasksHandler={onActiveTasksHandler}
          />
        </div>
        {showActiveTasks ? (
          <Container className={classes.cardGrid} maxWidth="md">
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-danger  mb-3"
                onClick={() => {
                  deleteTasksByIds();
                }}
              >
                Batch delete
              </button>

              <div className="home__checkAll">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    let value = e.target.checked;
                    setIsChecked(
                      activeTasks.map((d) => {
                        d.checked = value;
                        return d;
                      })
                    );
                  }}
                />
                <span className="home__checkAll-text">Check all</span>
              </div>
              <AddTaskForm
                handleSubmit={handleSubmit}
                formik={formik}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                // handleFileUpload={handleFileUpload}
                // onSubmit={onSubmit}
              />
            </div>
            <Grid container spacing={2}>
              {activeTasks.map((task) => (
                <ActiveTasks
                  task={task}
                  key={task.id}
                  setIsChecked={setIsChecked}
                  activeTasks={activeTasks}
                  openModal={openModal}
                  onDeleteTask={onDeleteTask}
                  onToggleStatus={onToggleStatus}
                  useStyles={useStyles}
                />
              ))}
            </Grid>
          </Container>
        ) : null}
        {showCompletedTasks ? (
          <Container className={classes.cardGrid} maxWidth="md">
            <h3>Completed tasks</h3>
            <Grid container spacing={2}>
              {completedTasks.map((task) => (
                <CompletedTasks
                  key={task.id}
                  useStyles={useStyles}
                  task={task}
                  onToggleStatus={onToggleStatus}
                  openModal={openModal}
                />
              ))}
            </Grid>
          </Container>
        ) : null}
      </div>
      <>
        {showTask && (
          <AddTaskModal showTask={showTask} closeModal={closeModal} />
        )}
      </>
    </>
  );
};
