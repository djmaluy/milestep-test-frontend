import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/actions";

export const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUser(email, password));
  };
  return (
    <div className="text-center">
      <h1 className="h3 mb-1 font-weight-normal">Please Log in</h1>
      <form onSubmit={onHandleSubmit} className="form-signin">
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
