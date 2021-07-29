import React from "react";

import * as API from "../../config/API";

import CustomTextField from "../custom_text_field/custom_text_field.component";
import CustomButton from "../custom_button/custom_button.component";
import GoogleButton from "react-google-button";
import { withRouter } from "react-router-dom";

import "./login.styles.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

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
          return this.props.history.push({
            pathname: "/profile",
            state: { user: data },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form className="login-comp" onSubmit={this.handleSubmit}>
          <CustomTextField
            type="email"
            name="email"
            label="Email"
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <CustomTextField
            type="password"
            name="password"
            label="Password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <a className="raised" href="/forgot_pass">
            Forgot Password...
          </a>
          <CustomButton type="submit">Sign In</CustomButton>
          <GoogleButton
            className="googleButton"
            label="Sign in using Google"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />{" "}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
