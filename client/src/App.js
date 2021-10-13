import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loginpage from "./pages/login/LoginPage";
import Chat from "./pages/chat/Chat";

import Openchat from "./pages/Openchat/Openchat";
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Loginpage />
            </Route>
            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path="/chatpage">
              <Chat />
            </Route>
            <Route exact path="/openchat/:id" children={<Openchat />}></Route>
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
