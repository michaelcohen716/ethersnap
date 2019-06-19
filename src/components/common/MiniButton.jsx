import React from "react";
import "./Button.css";

function MiniButton({ onClick, customClassName, text }) {
  return (
    <div
      onClick={onClick}
      className={`${customClassName} d-flex justify-content-center align-items-center mini-button`}
    >
    {text}
    </div>
  );
}

export default MiniButton;