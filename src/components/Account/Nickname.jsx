import React, { useState, useEffect } from "react";
import { setNickname as _setNickname } from "../../redux/app/actions";
import { connect } from "react-redux";
import Blockie from "react-blockies";
import MiniButton from "../common/MiniButton";
import AbridgedAddress from "../common/AbridgedAddress"; 
import "./Nickname.css";

function Nickname({ nickname, address, setNickname }) {
  /* State */
  const [newNickname, setNewNickname] = useState("");
  const [showNewNickname, toggleShowNewNickname] = useState(false);

  /* Lifecycle */
  useEffect(() => {
    setNewNickname(nickname);
  }, [nickname]);

  /* Functions */
  const changeNickname = async () => {
    setNickname(address, newNickname);
    toggleShowNewNickname(false);
  };

  if(!address){
    return null;
  }

  /* Render */
  const nicknameOrAddress = (
    nickname ? (
      <div className="ml-2 d-flex flex-column">
        <div>
          {nickname}
        </div>
        <div className="tiny-address">
          {address}
        </div>
      </div>
    ) : (
      <AbridgedAddress address={address} />
    )
  )

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <Blockie
          seed={address}
          size={20}
          scale={2}
        />
        {showNewNickname ? (
          <input
            type="text"
            value={newNickname}
            onChange={evt => setNewNickname(evt.target.value)}
            onBlur={changeNickname}
          />
        ) : ( 
          nicknameOrAddress
        )}
      </div>
      {!showNewNickname && <MiniButton customClassName="mt-2" text={nickname ? "Change nickname" : "Set nickname"} onClick={() => toggleShowNewNickname(true)} />}
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    setNickname: (address, nickname) =>
      dispatch(_setNickname(address, nickname))
  };
};

export default connect(
  null,
  mapDispatch
)(Nickname);
