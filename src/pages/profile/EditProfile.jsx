import React, { useState, useCallback, useRef, useEffect } from "react";
import { routes } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { getUser } from "../../redux/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../../store/routines";
import { EditProfileForm } from "./EditProfileForm";
import { ProfileData } from "./ProfileData";

const EditProfile = () => {
  const current_user = useSelector(getUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const [first_name, setFirstName] = useState(current_user?.first_name);
  const [last_name, setLastName] = useState(current_user?.last_name);
  const [phone, setPhone] = useState(current_user?.phone || "");
  const [address, setAddress] = useState(current_user?.address || "");

  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (croppedImage) {
      formData.append("image", croppedImage);
    }
    formData.set("first_name", first_name);
    formData.set("last_name", last_name);
    formData.set("phone", phone);
    formData.set("address", address);

    dispatch(updateUser(formData));
    history.push(routes.PROFILE);
    dispatch(fetchCurrentUser());
  };

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSrc(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      const previewUrl = URL.createObjectURL(blob);
      const newFile = new File([blob], selectedImage.name);

      setCroppedImageUrl(previewUrl);
      setCroppedImage(newFile);
    }, "image/jpg");
  }, [completedCrop, selectedImage]);

  return (
    <div className="container">
      {current_user ? (
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <ProfileData
                croppedImageUrl={croppedImageUrl}
                current_user={current_user}
                src={src}
                crop={crop}
                onLoad={onLoad}
                setCompletedCrop={setCompletedCrop}
                setCrop={setCrop}
                previewCanvasRef={previewCanvasRef}
              />
            </div>
            <div className="col-md-8">
              <div className="profile mb-3">
                <EditProfileForm
                  handleSubmit={handleSubmit}
                  first_name={first_name}
                  setFirstName={setFirstName}
                  last_name={last_name}
                  setLastName={setLastName}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                  handleFileUpload={handleFileUpload}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Please wait</h4>
      )}
    </div>
  );
};

export default EditProfile;
