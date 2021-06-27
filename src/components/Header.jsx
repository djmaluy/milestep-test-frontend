import React from "react";
import { NavLink } from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

export const Header = ({ user, setUser }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  let menu;
  if (!user === "") {
    menu = (
      <ul className="navbar-nav links">
        <li className="nav-item ">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink to="/registration" className="nav-link">
            Sign up
          </NavLink>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="navbar-nav links ">
        <li className="d-flex ">
          <PersonOutlineIcon className="avatar" />
          <span className="login">
            {user.first_name} {user.last_name}
          </span>
        </li>
        <li className="nav-item ">
          <NavLink to="/login" onClick={logout} className="nav-link">
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }
  return (
    <nav className="navbar navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand">
        Task management
      </NavLink>
      {menu}
    </nav>
  );
};
