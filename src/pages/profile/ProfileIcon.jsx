import React from "react";
import { routes } from "../../constants/routes";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

export const ProfileIcon = () => {
  return (
    <Tooltip title="Profile" placement="left">
      <Link to={routes.PROFILE} className="profile__icon">
        <div>Profile</div>
      </Link>
    </Tooltip>
  );
};
