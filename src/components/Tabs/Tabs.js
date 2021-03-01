import React from "react";
import Tab from "./Tab";
import "./styles.scss";

const Tabs = ({ children, activeTab, onClickTabItem }) => {
  return (
    <div className="tabs">
      <ol className="tab-list">
        {children.length > 0 &&
          children.map((child) => {
            const { label, projectId } = child.props;

            return (
              <Tab
                projectId={projectId}
                label={label}
                activeTab={activeTab}
                onClick={onClickTabItem}
                key={label}
              />
            );
          })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab.label) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
