import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Registration } from "./components/auth/Registration";
import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";

const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    let cleanupFunction = false;
    if (localStorage.getItem("token")) {
      fetch("http://localhost:3001/auto_login", {
        headers: { Authenticate: localStorage.token },
      })
        .then((res) => res.json())
        .then((user) => {
          if (!cleanupFunction) setUser(user);
        });
    }
    return () => {
      cleanupFunction = false;
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <div className="container">
          <Switch>
            <Route exact path={"/"} component={() => <Home user={user} />} />
            <Route exact path={"/registration"} component={Registration} />
            <Route
              exact
              path={"/login"}
              component={() => <Login setUser={setUser} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
