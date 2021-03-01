import React from "react";
import "./styles.scss";

const Tab = ({ projectId, label, activeTab, onClick: onClickTabItem }) => {
  let className = "tab-list-item";

  if (activeTab.label === label) {
    className += " tab-list-active";
  }
  const onClickEventHandler = (event) => {
    onClickTabItem({ label: label, projectId: projectId });
  };
  return (
    <li className={className} onClick={onClickEventHandler}>
      {label}
    </li>
  );
};

export default Tab;
