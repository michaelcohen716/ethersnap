import {
  LOAD_PRIV_KEY,
  LOAD_ADDRESS,
  SET_ACTIVE_TAB,
  SET_RECIPIENT,
  SET_ACCOUNT_BALANCE,
  CHECK_FOR_USER,
  RECEIVE_NICKNAME
} from "./types";
import { _checkForUser, _setNickname, watchForNicknameChange } from "./firebase";

export const loadPrivKey = privKey => {
  return {
    type: LOAD_PRIV_KEY,
    privKey
  };
};

export const loadAddress = address => {
  return {
    type: LOAD_ADDRESS,
    address
  };
};

export const setActiveTab = activeTab => {
  return {
    type: SET_ACTIVE_TAB,
    activeTab
  };
};

export const setRecipient = recipientAddress => {
  return {
    type: SET_RECIPIENT,
    recipientAddress
  };
};

export const setAccountBalance = accountBalance => {
  return {
    type: SET_ACCOUNT_BALANCE,
    accountBalance
  };
};

const receiveUser = ({ nickname }) => {
  return {
    type: CHECK_FOR_USER,
    nickname
  }
}

export const checkForUser = address => dispatch => {
  return _checkForUser(address).then(payload => {
    const user = payload.val();

    if(user){
      dispatch(receiveUser(user))
    }
  }) 
};

export const receiveNickname = ({ nickname }) => {
  return {
    type: RECEIVE_NICKNAME,
    nickname
  }
}

export const setNickname = (address, nickname) => dispatch => {
  _setNickname(address, nickname)
  watchForNicknameChange(address).then(nickname => {
    dispatch(receiveNickname(nickname))
  })
}

