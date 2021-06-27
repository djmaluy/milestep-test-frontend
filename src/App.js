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
import { fetchData, getSortedData } from "./redux/actions";

const HomeContainerWithSuspense = React.lazy(() =>
  import("./components/containers/HomeContainer")
);

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const sortedTasks = useSelector(getSortedTasks);

  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3000/auto_login", {
        headers: { Authenticate: localStorage.token },
      })
        .then((res) => res.json())
        .then((user) => {
          setUser(user);
        });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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

  const onDeleteTask = async (id) => {
    await api.delete(`/tasks/`, {
      data: {
        ids: [id],
      },
    });
    dispatch(fetchData());
  };

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

  useEffect(() => {
    dispatch(getSortedData());
  }, [tasks, dispatch]);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route
            exact
            path={"/"}
            render={() => (
              <HomeContainerWithSuspense
                user={user}
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
        </Suspense>

        <Route exact path={"/registration"} component={Registration} />
        <Route
          exact
          path={"/login"}
          render={() => <Login setUser={setUser} />}
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
