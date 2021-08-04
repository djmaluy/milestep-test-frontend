import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../constants/routes";
import { ProfileIcon } from "../pages/profile/ProfileIcon";

export const Header = ({ currentUser, logout }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <NavLink to={routes.ROOT} exact className="nav__links-item">
        <div className="logo">Logo</div>
      </NavLink>
      {currentUser ? (
        <>
          <div className="nav__links">
            <NavLink
              exact
              to={routes.ROOT}
              className="nav__links-item"
              activeClassName={"nav__link-selected"}
            >
              Home
            </NavLink>
            <NavLink
              to={routes.USERS}
              className="nav__links-item"
              activeClassName={"nav__link-selected"}
            >
              Users
            </NavLink>
            <NavLink
              to={routes.PROFILE}
              className="nav__links-item"
              activeClassName={"nav__link-selected"}
            >
              Profile
            </NavLink>
          </div>{" "}
          <ul className="navbar-nav links ">
            <li className="d-flex ">
              <span className="login">
                {currentUser.current_user?.email || currentUser.email}
              </span>
              <ProfileIcon logout={logout} />
            </li>
          </ul>
        </>
      ) : (
        <ul className="navbar-nav links">
          <li className="nav-item ">
            <NavLink to={routes.LOGIN} className="nav__links-item ">
              Login
            </NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to={routes.REGISTRATION} className="nav__links-item ">
              Sign up
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
