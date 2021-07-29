import React from "react";
import { routes } from "../../constants/routes";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Tooltip from "@material-ui/core/Tooltip";
import { NavLink } from "react-bootstrap";

export const ProfileIcon = () => {
  return (
    <Tooltip title="Profile" placement="left">
      <NavLink to={routes.PROFILE} className="profile__icon">
        <AccountCircleIcon />
      </NavLink>
    </Tooltip>
  );
};
