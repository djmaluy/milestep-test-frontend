import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Registration } from "./components/auth/Registration";
import React, { useEffect, useState, Suspense } from "react";
import { Header } from "./components/Header";
import { useFormik } from "formik";
import api from "./api/api";
import { EditTask } from "./components/tasks/EditTask";
import { TaskDetail } from "./components/tasks/TaskDetail";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, getSortedTasks } from "./redux/tasksSelector";
import {
  fetchData,
  getSortedData,
  getCurrentUser,
  clearEntity,
} from "./redux/actions";
import { getUser } from "./redux/authSelector";
import { PageNotFound } from "./components/pageNotFound/PageNotFound";

const HomeContainerWithSuspense = React.lazy(() =>
  import("./components/containers/HomeContainer")
);

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const sortedTasks = useSelector(getSortedTasks);
  const [open, setOpen] = useState(false);
  const current_user = useSelector(getUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSortedData());
  }, [tasks, dispatch]);

  const logout = async () => {
    await api.delete("/sessions");
    dispatch(clearEntity());
  };

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
        is_done: false,
      },
    };
    const response = await api.post(`/tasks`, request);
    dispatch(fetchData([...tasks, response.data]));
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
  const onDeleteTask = async (id) => {
    await api.delete(`/tasks/`, {
      data: {
        ids: [id],
      },
    });
    dispatch(fetchData());
  };
  //Updating task
  const updateTaskHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, task);
    dispatch(
      fetchData(
        tasks.map((task) => {
          return task.id === response.data.id ? { ...response.data } : task;
        })
      )
    );
    fetchData();
  };

  return (
    <Suspense fallback={<div className="loadingSuspense">Loading...</div>}>
      <BrowserRouter>
        <Header current_user={current_user} logout={logout} />
        <Switch>
          <Route
            exact
            path={"/"}
            render={() => (
              <HomeContainerWithSuspense
                current_user={current_user}
                sortedTasks={sortedTasks}
                handleSubmit={handleSubmit}
                formik={formik}
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
                onDeleteTask={onDeleteTask}
                setOpen={setOpen}
                fetchData={fetchData}
              />
            )}
          />
          <Route exact path={"/registration"} component={Registration} />
          <Route
            exact
            path={"/login"}
            render={() => <Login current_user={current_user} />}
          />
          <Route
            path="/edit/:id"
            render={(props) => (
              <EditTask
                {...props}
                updateTaskHandler={updateTaskHandler}
                formik={formik}
              />
            )}
          />
          <Route
            exact
            path={`/show`}
            render={() => <TaskDetail tasks={tasks} />}
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
