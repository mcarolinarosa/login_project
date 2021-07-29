import React, { useState } from "react";

import CustomTextDisplay from "../custom_text_display/text_display.component";
import SmallButton from "../../components/small_button/small_button.component";
import EditProfile from "../../components/edit_profile/edit_profile.component";
import { withRouter } from "react-router-dom";

import "./profile.styles.scss";

function Profile(props) {
  const id = props.location.state.user.id;
  const email = props.location.state.user.email;
  const [name, setName] = useState(props.location.state.user.name);
  const [image, setImage] = useState(props.location.state.user.image);
  const [isEditOn, setIsEditOn] = useState(false);

  return (
    <div>
      <div className="profile-comp">
        {!isEditOn ? (
          <div>
            <CustomTextDisplay value={image} />
            <CustomTextDisplay label="Name" value={name} />
            <CustomTextDisplay label="Email" value={email} />
          </div>
        ) : (
          <EditProfile
            changeName={(name) => setName(name)}
            changeImage={(image) => setImage(image)}
            name={name}
            email={email}
            image={image}
            id={id}
          />
        )}
        <SmallButton
          onClick={() => {
            setIsEditOn(!isEditOn);
          }}
        >
          {!isEditOn ? "Edit Profile" : "Back to Profile"}
        </SmallButton>
      </div>
    </div>
  );
}

export default withRouter(Profile);
