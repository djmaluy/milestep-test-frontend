import React from "react";

export const EditProfileForm = ({
  handleSubmit,
  first_name,
  setFirstName,
  last_name,
  setLastName,
  setPhone,
  phone,
  address,
  setAddress,
  handleFileUpload,
}) => {
  return (
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
  );
};
