import React from "react";
import { routes } from "../../constants/routes";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Tooltip from "@material-ui/core/Tooltip";

export const ProfileIcon = () => {
  return (
    <Tooltip title="Profile" placement="left">
      <Link to={routes.PROFILE} className="profile__icon">
        <AccountCircleIcon />
      </Link>
    </Tooltip>
  );
};
