import React, { useState } from "react";

import * as API from "../../config/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomTextField from "../custom_text_field/custom_text_field.component";
import CustomButton from "../custom_button/custom_button.component";
import SmallButton from "../../components/small_button/small_button.component";

import "./edit_profile.styles.scss";

function EditProfile(props) {
  const id = props.id;

  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(props.image);
  const [imageChanged, setImageChanged] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const notify = (text) => toast(text);

  const handleSubmitProfile = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);

    await fetch(API.apiPath + "api/edit_profile/" + id, {
      method: "PUT",
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          props.changeName(data.name);
          props.changeImage(data.image);
          setImage(data.image);
          setImageChanged(false);
          notify("Profile updated!");
        } else {
          notify(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();

    await fetch(API.apiPath + "api/change_pass/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: `${password}`,
        newPassword: `${newPassword}`,
        passwordRepeat: `${passwordRepeat}`,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          setPassword("");
          setNewPassword("");
          setPasswordRepeat("");
          notify("Profile updated!");
        } else {
          const data = await response.json();
          notify(data.message);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="flex-container">
      <div className="flex-child">
        <form className="edit-comp" onSubmit={handleSubmitProfile}>
          {imageChanged ? (
            <div className="search-image">
              <SmallButton type="button" onClick={handleClick}>
                Upload Photo
              </SmallButton>
              <input
                style={{ display: "none" }}
                ref={hiddenFileInput}
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              ></input>
              <div className="text-field-image">
                {image == null ? "Image" : image.name}
              </div>
            </div>
          ) : (
            <div className="search-image">
              <img
                onClick={handleClick}
                className="profile-pic"
                alt="profile_image"
                src={
                  image === null
                    ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                    : `data:image/jpeg;base64,${image}`
                }
              />
              <input
                style={{ display: "none" }}
                ref={hiddenFileInput}
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageChanged(true);
                }}
              ></input>
            </div>
          )}
          <CustomTextField
            required
            type="text"
            name="name"
            label="Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <CustomButton type="submit">Edit Profile</CustomButton>
        </form>
      </div>
      <div className="flex-child">
        <form className="edit-comp" onSubmit={handleSubmitPassword}>
          <CustomTextField
            required
            type="password"
            name="password"
            label="Current Password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <CustomTextField
            required
            type="password"
            name="newPassword"
            label="New Password"
            value={newPassword}
            handleChange={(e) => setNewPassword(e.target.value)}
          />
          <CustomTextField
            required
            type="password"
            name="passwordRepeat"
            label="Repeat New Password"
            value={passwordRepeat}
            handleChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <CustomButton type="submit">Change Password</CustomButton>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default EditProfile;
