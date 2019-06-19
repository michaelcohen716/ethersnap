import {
  LOAD_PRIV_KEY,
  LOAD_ADDRESS,
  SET_ACTIVE_TAB,
  SET_RECIPIENT,
  SET_ACCOUNT_BALANCE,
  CHECK_FOR_USER,
  RECEIVE_NICKNAME
} from "./types";
import { tabs } from "../../components/Navigation/Tabs";

const INITIAL_STATE = {
  privKey: null,
  userAddress: null,
  activeTab: tabs[0],
  recipientAddress: null,
  accountBalance: null,
  nickname: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PRIV_KEY: {
      return {
        ...state,
        privKey: action.privKey
      };
    }

    case LOAD_ADDRESS: {
      return {
        ...state,
        userAddress: action.address
      };
    }

    case SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.activeTab
      };
    }

    case SET_RECIPIENT: {
      return {
        ...state,
        recipientAddress: action.recipientAddress
      };
    }

    case SET_ACCOUNT_BALANCE: {
      return {
        ...state,
        accountBalance: action.accountBalance
      };
    }

    // This will expand to whole user object
    case CHECK_FOR_USER: {
      return {
        ...state,
        nickname: action.nickname
      }
    }

    case RECEIVE_NICKNAME: {
      return {
        ...state,
        nickname: action.nickname
      }
    }

    default:
      return state;
  }
};
