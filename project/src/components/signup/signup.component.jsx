import React from "react";

import * as API from "../../config/API";

import CustomTextField from "../custom_text_field/custom_text_field.component";
import CustomButton from "../custom_button/custom_button.component";
import SmallButton from "../../components/small_button/small_button.component";
import GoogleButton from "react-google-button";
import { withRouter } from "react-router-dom";

import "./signup.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      image: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, image } = this.state;

    await fetch(API.apiPath + "api/registry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
        image: `${image}`,
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
        <form className="signup-comp" onSubmit={this.handleSubmit}>
          <CustomTextField
            type="text"
            name="name"
            label="Name"
            value={this.state.name}
            handleChange={this.handleChange}
          />
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
          <CustomTextField
            type="password"
            name="passwordRepeat"
            label="Confirm Password"
            value={this.state.passwordRepeat}
            handleChange={this.handleChange}
          />
          <div className="search-image">
            <input
              className="text-field-image"
              type="text"
              placeholder="Image"
              onChange={this.handleChange}
            ></input>
            <SmallButton onClick="">Upload</SmallButton>
          </div>
          <CustomButton type="submit">Sign Up</CustomButton>
          <GoogleButton
            className="googleButton"
            label="Sign up using Google"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />{" "}
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
