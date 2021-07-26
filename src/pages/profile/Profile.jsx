import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "./Profile.css";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = ({ currentUser }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="container">
      {editMode ? (
        <EditProfile setEditMode={setEditMode} currentUser={currentUser} />
      ) : (
        <ProfileInfo setEditMode={setEditMode} currentUser={currentUser} />
      )}
    </div>
  );
};
