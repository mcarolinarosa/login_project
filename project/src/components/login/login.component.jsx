import React, { useState } from "react";

import * as API from "../../config/API";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomTextField from "../custom_text_field/custom_text_field.component";
import CustomButton from "../custom_button/custom_button.component";
import { useHistory } from "react-router-dom";

import "./login.styles.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const notify = (text) => toast(text);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(API.apiPath + "api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
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

  return (
    <div>
      <form className="login-comp" onSubmit={handleSubmit}>
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

        <CustomButton type="submit">Sign In</CustomButton>
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

export default Login;
