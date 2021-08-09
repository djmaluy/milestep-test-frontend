import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "./Profile.scss";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = ({ currentUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  return (
    <div className="container">
      {editMode && currentUser ? (
        <EditProfile
          croppedImageUrl={croppedImageUrl}
          setCroppedImageUrl={setCroppedImageUrl}
          setEditMode={setEditMode}
          currentUser={currentUser}
        />
      ) : (
        <ProfileInfo
          croppedImageUrl={croppedImageUrl}
          setEditMode={setEditMode}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};
