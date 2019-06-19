import React from "react";
import { withRouter } from "react-router-dom";
import "./Tabs.css";

function Tab({ title, activeTab, setActiveTab, history }) {
  const changeTab = () => {
    setActiveTab(title);
    history.push(`${title}`);
  };

  return (
    <div
      onClick={() => changeTab()}
      className={`tab ${
        title === activeTab ? "active-tab" : "inactive-tab"
      } d-flex justify-content-center align-items-center`}
    >
      <div>{title}</div>
    </div>
  );
}

export default withRouter(Tab);
