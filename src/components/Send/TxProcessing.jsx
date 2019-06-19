import React, { useState } from "react";
import useInterval from "../../utils/useInterval";
import "./TxProcessing.css";

function TxProcessing() {
  /* State */
  const [numDots, setNumDots] = useState(0);
  const [viewableMessages, incrementViewableMessages] = useState(0);

  /* Lifecycle */
  useInterval(() => {
    if (numDots === 3) {
      setNumDots(0);
    } else {
      setNumDots(numDots + 1);
    }
  }, 500);

  useInterval(() => {
    const TOTAL_MESSAGES = 3;
    if (viewableMessages < TOTAL_MESSAGES) {
      incrementViewableMessages(viewableMessages + 1);
    }
  }, 1500);

  /* Render */
  const dots = () => {
    let str = "";
    for (let i = 0; i < numDots; i++) {
      str += ".";
    }

    return str;
  };

  return (
    <div className="d-flex flex-column">
      <div className="tx-processing ml-3">
        Your transaction is processing {dots()} <br />
        {viewableMessages > 0 && (
          <div className="minute-confirm mr-4 mt-1">
            It may take up to a minute to confirm
          </div>
        )}
      </div>
      {viewableMessages > 1 && (
        <div className="mt-3 mean-time">
          In the mean time, here's an Ethereum fact to pass the time:
        </div>
      )}
      {viewableMessages > 2 && (
        <div className="mt-2 fun-fact">
          Ethereum runs on a consensus mechanism called proof of work
        </div>
      )}
    </div>
  );
}

export default TxProcessing;
