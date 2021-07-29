import React from "react";

import "./small_button.styles.scss";

const SmallButton = ({ children, ...otherProps }) => {
  return (
    <button className="small-button" {...otherProps}>
      {children}
    </button>
  );
};

export default SmallButton;
