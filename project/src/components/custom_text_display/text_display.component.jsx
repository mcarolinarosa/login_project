import React from "react";
import "./text_display.styles.scss";

const CustomTextDisplay = ({ label, value }) => {
  return (
    <div className="group">
      <h1 className="label-display">{label}</h1>
      <p className="text-display">{value}</p>
    </div>
  );
};

export default CustomTextDisplay;
