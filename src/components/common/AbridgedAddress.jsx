import React, { useState } from "react";
import Clipboard from "../../assets/clipboard.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Misc.css";

function AbridgedAddress({ address }) {
  const [copied, toggleCopied] = useState(false);

  if (!address) {
    return null;
  }

  const copyAddress = () => {
    toggleCopied(true);
    setTimeout(() => {
      toggleCopied(false);
    }, 2500);
  };

  return (
    <div className="d-flex my-auto ml-2">
      <div className="abridged-address">
        {address.slice(0, 16) + "..." + address.slice(36)}
      </div>
      <CopyToClipboard text={address} onCopy={() => copyAddress()}>
        <img alt="clipboard" src={Clipboard} className="clipboard ml-2" />
      </CopyToClipboard>
      {copied && <div className="ml-2 copied-text">Copied!</div>}
    </div>
  );
}

export default AbridgedAddress;
