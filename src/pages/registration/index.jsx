import React, { useState } from "react";
import api from "../../api/api";
import { checkEmail } from "../../App";

export const Registration = React.memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    };

    api
      .post("/users", data)
      .then((res) => {
        checkEmail();
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  return (
    <div className="text-center">
      <h1 className="h3 mb-1 font-weight-normal">Sign up</h1>
      <form onSubmit={handleSubmit} className="form-signin">
        <input
          type="firstName"
          name="firstName"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
          required
        />
        <input
          type="lastName"
          name="lastName"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
          required
        />
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password_confirmation"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          className="form-control"
          required
        />
        <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
});
