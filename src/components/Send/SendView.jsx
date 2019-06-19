import React from "react";
import { connect } from "react-redux";
import { setRecipient, setActiveTab } from "../../redux/app/actions";
import QrReader from "../QrReader";
import { withRouter } from "react-router-dom";
import { tabs } from "../Navigation/Tabs";

function SendView({ privKey, setRecipient, setActiveTab, history }) {
  if (!privKey) {
    history.push("/");
    setActiveTab(tabs[0]); // Account
    return null;
  }

  const handleScan = async data => {
    if (data) {
      setRecipient(data);
      history.push("/confirmSend");
    }
  };

  const handleError = err => {
    console.error(err);
  };

  return (
    <div className="d-flex flex-column">
      <div className="passkey-command my-3 d-flex justify-content-center">
        Scan the recipient's address
      </div>
      <QrReader handleScan={handleScan} handleError={handleError} />
    </div>
  );
}

const mapState = state => {
  return {
    privKey: state.app.privKey
  };
};

const mapDispatch = dispatch => {
  return {
    setRecipient: address => dispatch(setRecipient(address)),
    setActiveTab: tab => dispatch(setActiveTab(tab))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SendView)
);
