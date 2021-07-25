import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import React, { useEffect, useState, Suspense } from "react";
import { Header } from "./components/Header";
import { useFormik } from "formik";
import api from "./api/api";
import { EditTask } from "./components/tasks/EditTask";
import { TaskDetail } from "./components/tasks/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./redux/tasksSelector";
import { getUser } from "./redux/authSelector";
import { PageNotFound } from "./pages/pageNotFound";
import { HomeContainer } from "./components/containers/HomeContainer";
import { ConfirmEmail } from "./pages/confirmEmail";
import {
  deleteTask,
  fetchCurrentUser,
  fetchTasks,
  logoutUser,
  updateTask,
} from "./store/routines";
import { routes } from "./constants/routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Registration } from "./pages/registration";
import { AddTaskForm } from "./pages/addTaskForm";
import { Profile } from "./pages/profile/Profile";

export const checkEmail = () =>
  toast.success("Successfully register. Check your email please");
export const confirmAccount = () =>
  toast.warn("Check your email and confirm your account");

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const [open, setOpen] = useState(false);
  const currentUser = useSelector(getUser);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const logout = () => dispatch(logoutUser());

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  };
  // getting data from AddTaskForm and sending to database
  const handleSubmit = async () => {
    const { title, description, priority, dueDate } = formik.values;
    const request = {
      task: {
        title,
        description,
        priority,
        due_date: dueDate,
      },
    };
    const response = await api.post(`/tasks`, request);
    dispatch(fetchTasks([...tasks, response.data]));
    setOpen(false);
    formik.values.title = "";
    formik.values.description = "";
    formik.values.due_date = "";
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: 1,
      dueDate: getCurrentDate(),
    },
  });
  //deleting only one task
  const onDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };
  //Updating task
  const updateTaskHandler = (task) => {
    dispatch(updateTask(task));
  };

  return (
    <Suspense fallback={<div className="loadingSuspense">Loading...</div>}>
      <BrowserRouter>
        <Header currentUser={currentUser} logout={logout} />
        <Switch>
          <Route
            exact
            path={routes.ROOT}
            component={() => (
              <HomeContainer
                handleClickOpen={handleClickOpen}
                current_user={currentUser}
                tasks={tasks}
                onDeleteTask={onDeleteTask}
                setOpen={setOpen}
                fetchData={fetchTasks}
              />
            )}
          />
          <Route exact path={routes.REGISTRATION} component={Registration} />
          <Route
            exact
            path={routes.LOGIN}
            component={() => <Login current_user={currentUser} />}
          />
          <Route
            path={routes.ADD_TASK}
            component={() => (
              <AddTaskForm
                open={open}
                handleClose={handleClose}
                formik={formik}
                handleSubmit={handleSubmit}
              />
            )}
          />
          <Route
            path={routes.EDIT_TASK}
            component={() => (
              <EditTask updateTaskHandler={updateTaskHandler} formik={formik} />
            )}
          />
          <Route
            exact
            path={routes.SHOW}
            component={() => <TaskDetail tasks={tasks} />}
          />
          <Route path={routes.EMAIL_CONFIRMATION} component={ConfirmEmail} />
          <Route
            path={routes.PROFILE}
            component={() => <Profile currentUser={currentUser} />}
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
