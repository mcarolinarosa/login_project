import React from "react";
import Profile from "../../components/profile/profile.component";
import SmallButton from "../../components/small_button/small_button.component";
import { Link } from "react-router-dom";

import "./profile_page.styles.scss";

export default function ProfilePage() {
  return (
    <div className="profile">
      <div className="logoutButton">
        <Link to="/">
          <SmallButton>Log out</SmallButton>
        </Link>
      </div>
      <div className="someSpace" />
      <div className="container">
        <div className="myProfile">My Profile</div>
        <Profile />
      </div>
    </div>
  );
}
