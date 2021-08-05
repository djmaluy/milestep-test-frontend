import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import userPhoto from "../../assets/images/user.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const ProfileData = ({
  croppedImageUrl,
  current_user,
  src,
  crop,
  onLoad,
  setCompletedCrop,
  setCrop,
  previewCanvasRef,
}) => {
  return (
    <div className="profile">
      <div className="profile-body">
        <Link to={routes.PROFILE} className="edit__button">
          <ArrowBackIcon />
        </Link>
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={croppedImageUrl || current_user.image.url || userPhoto}
            alt="avatar"
            className="rounded-circle"
            width="150"
          />
          {src && (
            <>
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={onLoad}
                onComplete={(c) => setCompletedCrop(c)}
                onChange={(c) => setCrop(c)}
              />
              <canvas ref={previewCanvasRef} style={{ width: 0, height: 0 }} />
            </>
          )}
          <div className="mt-3">
            <div className="currentUser__fullname">
              {current_user?.first_name} {current_user?.last_name}
            </div>
            <p className="text-secondary mb-1">{current_user?.email}</p>
            <p className="text-muted font-size-sm">{current_user?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
