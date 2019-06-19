import React, { useState, useEffect } from "react";
import BigBalance from "./BigBalance";
import Nickname from "./Nickname";
import { web3 } from "../../services/web3";
import { connect } from "react-redux";
import { setAccountBalance } from "../../redux/app/actions";
import { withRouter } from "react-router-dom";
import {
  loadAddress,
  checkForUser as _checkForUser
} from "../../redux/app/actions";
import "./AccountView.css";

function AccountView({
  setAccountBalance,
  privKey,
  history,
  checkForUser,
  loadAddress,
  nickname,
  userAddress
}) {
  /* State */
  const [accountBalance, changeAccountBalance] = useState(null);
  const [balanceLoading, toggleBalanceLoading] = useState(false);

  /* Lifecycle */
  useEffect(() => {
    const loadAccount = async () => {
      toggleBalanceLoading(true);
      manageAccountInfo();
    };

    if (privKey) {
      loadAccount();
    }
  }, []);

  if (!privKey) {
    history.push("/");
    return null;
  }

  /* Functions */
  const getAccountBalance = async address => {
    let balance = await web3.eth.getBalance(address);
    balance = await web3.utils.fromWei(balance, "gwei");

    changeAccountBalance(balance);
    setAccountBalance(balance);
    toggleBalanceLoading(false);
  };

  const manageAccountInfo = async () => {
    const acct = web3.eth.accounts.privateKeyToAccount(privKey);
    getAccountBalance(acct.address); // web3
    checkForUser(acct.address); // firebase
    loadAddress(acct.address); // redux
  };

  /* Render */
  return (
    <div className="d-flex flex-column">
      <Nickname 
        nickname={nickname} 
        address={userAddress}
        />
      {balanceLoading && <div>Loading...</div>}
      {accountBalance && <BigBalance accountBalance={accountBalance} />}
    </div>
  );
}

const mapState = state => {
  return {
    privKey: state.app.privKey,
    nickname: state.app.nickname,
    userAddress: state.app.userAddress
  };
};

const mapDispatch = dispatch => {
  return {
    setAccountBalance: balance => dispatch(setAccountBalance(balance)),
    checkForUser: address => dispatch(_checkForUser(address)),
    loadAddress: address => dispatch(loadAddress(address))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(AccountView)
);
