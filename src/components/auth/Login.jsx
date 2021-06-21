import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        setRedirect(true);
        setUser(data.user);
      });
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="text-center">
      <h1 className="h3 mb-1 font-weight-normal">Please Log in</h1>
      <form onSubmit={handleSubmit} className="form-signin">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
        />

        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
