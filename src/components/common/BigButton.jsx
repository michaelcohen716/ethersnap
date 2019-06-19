import React from "react";
import "./Button.css";

function BigButton({ onClick, text, customClassName }) {
  return (
    <div
      className={`${customClassName} d-flex justify-content-center align-items-center big-button`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default BigButton;
