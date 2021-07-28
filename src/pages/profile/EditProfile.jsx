import React, { useState } from "react";
import { routes } from "../../constants/routes";
import { Link, useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getUser } from "../../redux/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../../store/routines";

const EditProfile = () => {
  const current_user = useSelector(getUser);
  const history = useHistory();

  const [first_name, setFirstName] = useState(current_user?.first_name);
  const [last_name, setLastName] = useState(current_user?.last_name);
  const [phone, setPhone] = useState(current_user?.phone || "");
  const [address, setAddress] = useState(current_user?.address || "");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("first_name", first_name);
    formData.set("last_name", last_name);
    formData.set("phone", phone);
    formData.set("address", address);
    formData.append("image", image);

    dispatch(updateUser(formData));
    history.push(routes.PROFILE);
    dispatch(fetchCurrentUser());
  };

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="profile">
              <div className="profile-body">
                <Link to={routes.PROFILE} className="edit__button">
                  <ArrowBackIcon />
                </Link>
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={current_user?.image.url}
                    alt="avatar"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <div className="currentUser__fullname">
                      {current_user?.first_name} {current_user?.last_name}
                    </div>
                    <p className="text-secondary mb-1">{current_user?.email}</p>
                    <p className="text-muted font-size-sm">
                      {current_user?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile mb-3">
              <form onSubmit={handleSubmit} className="profile-body">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Change avatar</label>
                  <input
                    accept="image/*"
                    name="image"
                    type="file"
                    onChange={handleFileUpload}
                  />
                </div>
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
