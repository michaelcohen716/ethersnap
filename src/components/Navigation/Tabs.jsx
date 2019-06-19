import React from "react";
import Tab from "./Tab";
import { connect } from "react-redux";
import { setActiveTab } from "../../redux/app/actions";
import "./Tabs.css";

export const tabs = ["Account", "Send", "Receive"];

function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs d-flex mb-3">
      {tabs.map(t => {
        return (
          <Tab
            key={t}
            title={t}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      })}
    </div>
  );
}

const mapState = state => {
  return {
    activeTab: state.app.activeTab
  };
};

const mapDispatch = dispatch => {
  return {
    setActiveTab: tab => dispatch(setActiveTab(tab))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Tabs);
