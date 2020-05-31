import React from "react";
import ReactDOM from "react-dom";
import "./Header.scss";

const Header = () => {
  const content = (
    <div className="header-content">
      <h1 className="header-text">
        A slider made with React and NodeJS Express
      </h1>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("header"));
};

export default Header;
