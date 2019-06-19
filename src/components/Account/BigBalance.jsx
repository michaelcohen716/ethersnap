import React, { useState, useEffect } from "react";
import EtherSymbol from "../../assets/ether-symbol.png";
import NumberFormat from "react-number-format";
import { ethToUSD } from "../../utils/request";
import Eth24Hr from "./Eth24Hr";
import "./BigBalance.css";

function BigBalance({ accountBalance }) {
  /* State */
  const [dollarValue, setDollarValue] = useState(null);

  /* Lifecycle */
  useEffect(() => {
    const getDollarValue = async () => {
      const dollarsToEth = await ethToUSD();
      const gweiToEthDivisor = 1000000000;
      setDollarValue(dollarsToEth * (accountBalance / gweiToEthDivisor));
    };
    
    if (!dollarValue) {
      getDollarValue();
    }
  }, [dollarValue, setDollarValue, accountBalance]);

  /* Render */
  if (accountBalance) {
    return (
      <div className="big-balance d-flex flex-column">
        <div className="balance-label mt-3 d-flex">
          <div>Your balance in</div>
          <img
            className="ether-img img-fluid"
            alt="ether"
            src={EtherSymbol}
          />{" "}
          :
        </div>
        <div className="account-balance d-flex">
          <NumberFormat
            displayType="text"
            value={accountBalance}
            thousandSeparator={true}
            decimalScale={0}
          />
          <div>&nbsp;Gwei</div>
        </div>
        {dollarValue && (
          <div className="d-flex flex-column">
            <div className="balance-label mt-3 d-flex">
              <div>Your balance in USD:</div>
            </div>
            <div className="d-flex">
              <div className="account-balance d-flex">
                $
                <NumberFormat
                  displayType="text"
                  value={dollarValue}
                  thousandSeparator={true}
                  decimalScale={2}
                />
              </div>
              <Eth24Hr />
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default BigBalance;
