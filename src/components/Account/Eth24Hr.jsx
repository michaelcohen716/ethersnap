import React, { useState, useEffect } from "react";
import { eth24Hr } from "../../utils/request";
import GreenUpArrow from "../../assets/green-arrow.png";
import RedDownArrow from "../../assets/red-arrow.png";
import "./Eth24Hr.css";

function Eth24Hr() {
  const [percent24Hr, setPercent24Hr] = useState(null);

  useEffect(() => {
    const getPriceChange = async () => {
      const percentChange = await eth24Hr();
      setPercent24Hr(percentChange);
    };

    getPriceChange();
  }, [setPercent24Hr]);

  if (!percent24Hr) {
    return null;
  }

  const arrowImg = percent24Hr > 0 ? GreenUpArrow : RedDownArrow;
  const sanitizedPercent =
    String(Math.abs(percent24Hr * 100)).slice(0, 4) + "%";

  return (
    <div className="d-flex align-items-end mb-2 ml-2 eth-24">
      <div>ETH</div>
      <div className="arrow-img">
        <img src={arrowImg} className="img-fluid" width="25px" height="30px" />
      </div>
      <div className="mr-1">{sanitizedPercent}</div>
      <div> &#8226; 24HR </div>
    </div>
  );
}

export default Eth24Hr;
