import React from "react";
import { NavLink } from "react-router-dom";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

export const Header = ({ currentUser, logout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand">
        Task management
      </NavLink>
      {!currentUser ? (
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
      ) : (
        <ul className="navbar-nav links ">
          <li className="d-flex ">
            <PersonOutlineIcon className="avatar" />
            <span className="login">
              {currentUser.current_user?.email || currentUser.email}
            </span>
          </li>
          <li className="nav-item ">
            <NavLink to="/login" onClick={logout} className="nav-link">
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
