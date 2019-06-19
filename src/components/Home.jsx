import React from "react";
import Router from "../Router";
import { connect } from "react-redux";
import { setActiveTab } from "../redux/app/actions";
import "./Home.css";

function Home({ activeTab, setActiveTab }) {
  return (
    <div className="home d-flex flex-column justify-content-center align-items-center">
      <div className="active-view py-2 px-4">
        <Router />
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    activeTab: state.app.activeTab
  }
}

const mapDispatch = (dispatch) => {
  return {
    setActiveTab: (tab) => dispatch(setActiveTab(tab))
  }
}

export default connect(mapState, mapDispatch)(Home);
