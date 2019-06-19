import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import "./QrCreator.css";

function QrCreator() {
  /* State */
  const [code, setCode] = useState(null);

  // const type = "Passcode"
  const type = "Address";

  const key = "";

  /* Lifecycle */
  useEffect(() => {
    if (!code) {
      create();
    }
  }, [code]);

  /* Functions */
  const create = () => {
    QRCode.toDataURL(key).then(url => {
      setCode(url);
    });
  };

  /* Render */
  const codeImg = (
    <img alt="code" src={code} width="200px" height="200px" />
  )

  if (type === "Passcode") {
    return (
      <div
        className="qr-passcode d-flex flex-column align-items-center"
        width="250px"
        height="250px"
      >
        <div className="my-2 login-instructions text-align-center">
          <span className="ml-2" />Go to ethersnap.io and <br />
          scan your passcode below
        </div>
        {code && codeImg}
      </div>
    );
  } else {
    return (
      <div
        className="qr-address d-flex flex-column align-items-center"
        width="250px"
        height="250px"
      >
        <div className="ethersnap">ethersnap.io</div>
        <div className="my-2 public-address">Your public address:</div>
        {code && codeImg}
      </div>
    );
  }
}

export default QrCreator;
