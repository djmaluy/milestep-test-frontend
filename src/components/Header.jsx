import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { ProfileIcon } from "../pages/profile/ProfileIcon";

export const Header = ({ currentUser, logout }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="nav__links">
        <NavLink to={routes.ROOT} className="nav__links">
          Task management
        </NavLink>
        <NavLink to={routes.USERS} className="nav__links">
          Display users
        </NavLink>
      </div>
      {!currentUser ? (
        <ul className="navbar-nav links">
          <li className="nav-item ">
            <NavLink to={routes.LOGIN} className="nav__links">
              Login
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to={routes.REGISTRATION} className="nav__links">
              Sign up
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav links ">
          <li className="d-flex ">
            <ProfileIcon />
            <span className="login">
              {currentUser.current_user?.email || currentUser.email}
            </span>
          </li>
          <li className="nav-item ">
            <NavLink to={routes.LOGIN} onClick={logout} className="nav-link">
              Logout
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
