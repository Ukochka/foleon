import React from "react";
import publicationIcon from "../../icons/publicationIcon.png";
import "./styles.scss";

const ResourceCard = ({ title, type }) => {
  return (
    <div className="ResourceCard">
      <div className="Type">
        <img className="icon" alt={type} src={publicationIcon}></img>
        {type}
      </div>

      <p className="ResourceName">{title}</p>
    </div>
  );
};

export default ResourceCard;
