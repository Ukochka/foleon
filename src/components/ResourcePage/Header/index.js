import React from "react";
import "./styles.scss";

const Header = ({ children, t }) => (
  <div className="Header">
    <h1>{t("resourcesHeader")}</h1>
    {children}
  </div>
);

export default Header;
