import React from "react";
import Login from "../../components/login/login.component";
import SmallButton from "../../components/small_button/small_button.component";
import { Link } from "react-router-dom";

import "./login_page.styles.scss";

export default function LoginPage() {
  return (
    <div className="login">
      <div className="signupButton">
        <Link to="/signup">
          <SmallButton>Sign Up</SmallButton>
        </Link>
      </div>
      <div className="someSpace"></div>
      <div className="container">
        <Login />
      </div>
    </div>
  );
}
