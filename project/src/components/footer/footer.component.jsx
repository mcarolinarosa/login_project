import React from "react";
import "./footer.styles.scss";

const Footer = () => {
  return (
    <div className="footer-div">
      <ul className="footerLink">
        <li>
          <a href="/">Terms</a>
        </li>
        <li>
          <a href="/">Privacy</a>
        </li>
        <li>
          <a href="/">Other</a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
