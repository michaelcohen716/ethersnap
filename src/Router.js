import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountView from "./components/Account/AccountView";
import ScanView from "./components/ScanView";
import Tabs from "./components/Navigation/Tabs";
import SendView from "./components/Send/SendView";
import ConfirmSendView from "./components/Send/ConfirmSendView";
import QrCreator from "./components/QrCreator";

function RouterComponent() {
  return (
    <Router>
      <Route>
        <div>
          <Tabs />
        </div>
      </Route>
      <Switch>
        <Route initial exact path="/" component={ScanView} />
        <Route path="/account" component={AccountView} />
        <Route path="/send" component={SendView} />
        <Route path="/confirmSend" component={ConfirmSendView} />
      </Switch>
    </Router>
  );
}

export default RouterComponent;
