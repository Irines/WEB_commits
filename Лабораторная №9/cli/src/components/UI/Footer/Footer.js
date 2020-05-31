import React from "react";
import ReactDOM from "react-dom";
import "./Footer.scss";
import { ReactComponent as IgIcon } from "./img/ig-icon.svg";
import { ReactComponent as TgIcon } from "./img/tg-icon.svg";
import { ReactComponent as SkypeIcon } from "./img/skype-icon.svg";

const Footer = () => {
  const content = (
    <div className="footer-content">
      <span className="footer-credentials">Сделано: Киселёва Ирина</span>
      <span className="footer-contact"> Контактная информация:</span>
      <a href="https://www.instagram.com/and_18_others?r=nametag">
        <IgIcon />
      </a>
      <a href="https://t.me/Querttty">
        <TgIcon />
      </a>
      <a href="https://join.skype.com/invite/oopCU1sefMbp">
        <SkypeIcon className="skype-icon" />
      </a>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("footer"));
};

export default Footer;
