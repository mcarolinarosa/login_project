import React from "react";
import "./custom_text_field.styles.scss";

const CustomTextField = ({ handleChange, label, value, ...otherProps }) => {
  return (
    <div className="group">
      <input
        className="text-field"
        type="text"
        placeholder={label}
        onChange={handleChange}
        value={value}
        {...otherProps}
      />
    </div>
  );
};

export default CustomTextField;
