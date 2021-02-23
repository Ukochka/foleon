import React from "react";
import "./styles.scss";

const ResourceCard = ({ title, link }) => {
  const getRequest = () => {};
  return (
    <div className="ResourceCard">
      <p className="ResourceName">{title}</p>
      <a href={link} onClick={getRequest}>
        Click Me
      </a>
    </div>
  );
};

export default ResourceCard;
