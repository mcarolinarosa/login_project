import React from "react";
import SignUp from "../../components/signup/signup.component";
import SmallButton from "../../components/small_button/small_button.component";
import { Link } from "react-router-dom";

import "./signup_page.styles.scss";

export default function SignUpPage() {
  return (
    <div className="signup">
      <div className="signupButton">
        <Link to="/">
          <SmallButton>Log in</SmallButton>
        </Link>
      </div>
      <div className="someSpace" />
      <div className="container">
        <div className="title">Create an Account</div>
        <SignUp />
      </div>
    </div>
  );
}
