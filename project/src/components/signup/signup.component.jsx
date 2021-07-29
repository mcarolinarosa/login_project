import React, { useState } from "react";

import * as API from "../../config/API";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTextField from "../custom_text_field/custom_text_field.component";
import CustomButton from "../custom_button/custom_button.component";
import SmallButton from "../../components/small_button/small_button.component";
import { useHistory } from "react-router-dom";

import "./signup.styles.scss";

function SignUp() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const history = useHistory();

  const notify = (text) => toast(text);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordRepeat", passwordRepeat);

    await fetch(API.apiPath + "api/registry", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          notify("Profile Created!");
          return history.push({
            pathname: "/profile",
            state: { user: data },
          });
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
    <div>
      <form className="signup-comp" onSubmit={handleSubmit}>
        <CustomTextField
          required
          type="text"
          name="name"
          label="Name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <CustomTextField
          required
          type="email"
          name="email"
          label="Email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          required
          type="password"
          name="password"
          label="Password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <CustomTextField
          required
          type="password"
          name="passwordRepeat"
          label="Confirm Password"
          value={passwordRepeat}
          handleChange={(e) => setPasswordRepeat(e.target.value)}
        />
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
        <CustomButton type="submit">Sign Up</CustomButton>
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
  );
}

export default SignUp;
