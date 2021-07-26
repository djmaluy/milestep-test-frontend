import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { routes } from "../../constants/routes";
import { Link } from "react-router-dom";

export const ProfileInfo = ({ currentUser, setEditMode }) => {
  return (
    <div className="main-body">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="profile">
            <div className="profile-body">
              <Link to={routes.EDIT_PROFILE} onClick={() => setEditMode(true)}>
                <EditIcon />
              </Link>
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="avatar"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <div className="currentUser__fullname">
                    {currentUser?.first_name} {currentUser?.last_name}
                  </div>
                  <p className="text-secondary mb-1">{currentUser?.email}</p>
                  <p className="text-muted font-size-sm">
                    {currentUser?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="profile mb-3">
            <form className="profile-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">First Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {currentUser?.first_name}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Last Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {currentUser?.last_name}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {currentUser?.email}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {currentUser?.phone}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {currentUser?.address}
                </div>
              </div>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
