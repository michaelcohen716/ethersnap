import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { gweiToEther } from "../../utils/units";
import { sendEtherTransaction, web3 } from "../../services/web3";
import TxProcessing from "./TxProcessing";
import TxConfirmed from "./TxConfirmed";
import NumberFormat from "react-number-format";
import "./ConfirmSendView.css";

function ConfirmSendView({
  recipientAddress,
  privKey,
  history,
  accountBalance
}) {
  if (!recipientAddress) {
    history.push("/");
  }

  /* State */
  const [amountToSend, setAmountToSend] = useState(
    ""
  ); /* amountToSend denominated in gwei */
  const [txProcessing, toggleTxProcessing] = useState(false);
  const [txConfirmed, toggleTxConfirmed] = useState(false);
  const [validationError, toggleValidationError] = useState(false);

  /* Functions */
  const sendEther = async () => {
    const etherValue = String(gweiToEther(amountToSend));
    toggleTxProcessing(true);
    const txHash = await sendEtherTransaction(
      privKey.slice(2),
      recipientAddress,
      etherValue
    );

    const sliced = txHash.slice(txHash.indexOf("0x"));
    checkForConfirmedTx(sliced);
  };

  const checkForConfirmedTx = async txHash => {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    if (receipt) {
      toggleTxProcessing(false);
      toggleTxConfirmed(true);
    } else {
      setTimeout(() => {
        checkForConfirmedTx(txHash);
      }, 1000);
    }
  };

  const amountOnChange = evt => {
    const val = evt.target.value;

    // still need to account for gas costs here
    if (Number(amountToSend) > Number(accountBalance)) {
      toggleValidationError(true);
    } else {
      toggleValidationError(false);
      setAmountToSend(val);
    }
  };

  if (txProcessing) {
    return <TxProcessing />;
  }

  if (txConfirmed) {
    return <TxConfirmed />;
  }

  /* Render */
  return (
    <div className="d-flex flex-column">
      <div className="confirm-text mb-3">Confirm your transaction</div>
      <div className="sending-to">
        Sending to:{" "}
        <span className="recipient-address">{recipientAddress}</span>
      </div>
      <div className="sending-to mt-2">
        My Balance:{" "} <br/>
        <span className="recipient-address">
          <NumberFormat
            displayType="text"
            value={accountBalance}
            thousandSeparator={true}
            decimalScale={0}
          /> Gwei
        </span>
      </div>
      <div className="gwei-input-holder d-flex mt-3">
        <div className="gwei-label p-3 d-flex justify-content-center align-items-center">
          Gwei
        </div>
        <input
          type="number"
          value={amountToSend}
          onChange={amountOnChange}
          className="amount-input"
          autoFocus
        />
        <button
          disabled={validationError || amountToSend <= 0}
          onClick={sendEther}
          className="confirm-button d-flex justify-content-center align-items-center"
        >
          Send
        </button>
      </div>
    </div>
  );
}

const mapState = state => {
  return {
    recipientAddress: state.app.recipientAddress,
    privKey: state.app.privKey,
    accountBalance: state.app.accountBalance
  };
};

export default withRouter(
  connect(
    mapState,
    null
  )(ConfirmSendView)
);
