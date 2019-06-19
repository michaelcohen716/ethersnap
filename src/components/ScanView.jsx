import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadPrivKey } from '../redux/app/actions';
import QrReader from "./QrReader";

function ScanView(props) {
  const devLoad = async() => {
    await handleScan(process.env.REACT_APP_TEST_PRIVATE_KEY)
  }

  const devMode = true;

  if (props.privKey) {
    props.history.push('/account');
    return null;
  }

  /* Functions */
  const handleScan = async data => {
    if (data) {
      const privKey = "0x" + data;
      props.loadPrivKey(privKey);
      props.history.push('/account')
    }
  };

  const handleError = err => {
    console.error(err);
  };

  /* Render */
  return (
    <div className="d-flex flex-column">
      <div className="passkey-command my-3 d-flex justify-content-center">
        Scan your passcode to access your account
      </div>
      {devMode ? (
        <div onClick={devLoad}>Scan</div>
      ) : (
        <QrReader
          showViewFinder={false}
          handleScan={handleScan}
          handleError={handleError}
        />
      )}
    </div>
  );
}

const mapState = state => {
  return {
    privKey: state.app.privKey
  };
};

const mapDispatch = dispatch => {
    return {
        loadPrivKey: (privKey) => dispatch(loadPrivKey(privKey))
    }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ScanView)
);
