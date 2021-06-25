import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Registration } from "./components/auth/Registration";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { useFormik } from "formik";
import api from "./api/api";
import { EditTask } from "./components/tasks/EditTask";
import { TaskDetail } from "./components/tasks/TaskDetail";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const [sortedTasks, setSortedTasks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3001/auto_login", {
        headers: { Authenticate: localStorage.token },
      })
        .then((res) => res.json())
        .then((user) => {
          setUser(user);
        });
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks`);
      const result = await response.json();
      setTasks(result);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
    setTasks([...tasks, response.data]);
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
    await api.delete(`/tasks/${id}`);
    fetchData();
  };

  const updateTaskHandler = async (task) => {
    const response = await api.put(`/tasks/${task.id}`, task);

    setTasks(
      tasks.map((task) => {
        return task.id === response.data.id ? { ...response.data } : task;
      })
    );
    fetchData();
  };

  useEffect(() => {
    const sortTasks = () => {
      // a[field] > b[field] ? 1 : -1
      const sorted = [...tasks].sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      setSortedTasks(sorted);
    };
    sortTasks();
  }, [tasks]);

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route
          exact
          path={"/"}
          render={() => (
            <Home
              user={user}
              tasks={sortedTasks}
              setTasks={setTasks}
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
