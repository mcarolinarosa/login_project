import React, { useState } from "react";

import * as API from "../../config/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomTextField from "../custom_text_field/custom_text_field.component";
import CustomButton from "../custom_button/custom_button.component";

import "./edit_profile.styles.scss";

function EditProfile(props) {
  const id = props.id;

  const [name, setName] = useState(props.name);
  const [image, setImage] = useState(props.image);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const notify = (text) => toast(text);

  const handleSubmitProfile = async (event) => {
    console.log("cheguei");
    event.preventDefault();

    await fetch("http://localhost:8080/api/edit_profile/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        image: `${image}`,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          props.changeName(data.name);
          props.changeImage(data.image);
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

  return (
    <div className="flex-container">
      <div className="flex-child">
        <form className="edit-comp" onSubmit={handleSubmitProfile}>
          <CustomTextField
            type="text"
            name="name"
            label="Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <CustomTextField
            type="text"
            name="image"
            label="Image"
            value={image}
            handleChange={(e) => setImage(e.target.value)}
          />
          <CustomButton type="submit">Edit Profile</CustomButton>
        </form>
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
      <div className="flex-child">
        <form className="edit-comp" onSubmit={handleSubmitPassword}>
          <CustomTextField
            type="password"
            name="password"
            label="Current Password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <CustomTextField
            type="password"
            name="newPassword"
            label="New Password"
            value={newPassword}
            handleChange={(e) => setNewPassword(e.target.value)}
          />
          <CustomTextField
            type="password"
            name="passwordRepeat"
            label="Repeat New Password"
            value={passwordRepeat}
            handleChange={(e) => setPasswordRepeat(e.target.value)}
          />
          <CustomButton type="submit">Change Password</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
