import React from "react";
import projectIcon from "../../icons/projectIcon.png";
import publicationIcon from "../../icons/publicationIcon.png";
import "./styles.scss";

const ResourceCard = ({ title, link, type }) => {
  const getIcon = (type) => {
    if (type === "project")
      return <img className="icon" alt={type} src={projectIcon}></img>;
    if (type === "publication")
      return <img className="icon" alt={type} src={publicationIcon}></img>;
  };
  const getRequest = () => {};
  return (
    <div className="ResourceCard">
      <div className="Type">
        {getIcon(type)}
        {type}
      </div>

      <p className="ResourceName">{title}</p>
      <a href={link} onClick={getRequest}>
        Details
      </a>
    </div>
  );
};

export default ResourceCard;
