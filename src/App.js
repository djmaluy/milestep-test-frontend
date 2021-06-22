import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Registration } from "./components/auth/Registration";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { useFormik } from "formik";
import api from "./api/api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    // let cleanupFunction = false;
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3001/auto_login", {
        headers: { Authenticate: localStorage.token },
      })
        .then((res) => res.json())
        .then((user) => {
          setUser(user);
        });
    }
    // return () => {
    //   cleanupFunction = false;
    // };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tasks`);
        const result = await response.json();
        setTasks(result);
      } catch (e) {
        alert(e);
      }
    };
    fetchData();
  }, []);

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
    console.log(response);
    // setTasks([...tasks, response.data]);
  };

  // const addProductHandler = async (title, price, description) => {
  //   const request = {
  //     id: uuid(),
  //     title,
  //     price,
  //     description,
  //   };
  //   const response = await api.post("/products", request);
  //   setProductsData([...productsData, response.data]);
  // };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: 1,
      dueDate: getCurrentDate(),
    },
  });
  return (
    <>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <div className="container">
          <Switch>
            <Route
              exact
              path={"/"}
              render={() => (
                <Home
                  user={user}
                  tasks={tasks}
                  handleSubmit={handleSubmit}
                  formik={formik}
                />
              )}
            />
            <Route exact path={"/registration"} component={Registration} />
            <Route
              exact
              path={"/login"}
              render={() => <Login setUser={setUser} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
