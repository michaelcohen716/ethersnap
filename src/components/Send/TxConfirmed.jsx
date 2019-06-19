import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveTab } from "../../redux/app/actions";
import { tabs } from "../Navigation/Tabs";
import BigButton from "../common/BigButton";

function TxConfirmed({ history, setActiveTab }) {
  const goToAccount = () => {
    history.push("/account");
    setActiveTab(tabs[0])
  };

  return (
    <div className="d-flex flex-column">
      <div className="text-center">
        Congratulations! Your transaction was confirmed.
      </div>
      <div className="mt-2 d-flex justify-content-center align-items-center">
        <BigButton
          customClassName="mt-2"
          onClick={goToAccount}
          text="Go back to My Account"
        />
      </div>
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    setActiveTab: tab => dispatch(setActiveTab(tab))
  };
};

export default withRouter(
  connect(
    null,
    mapDispatch
  )(TxConfirmed)
);
