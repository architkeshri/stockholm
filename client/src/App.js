import React, { Component, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";

import Openchat from "./pages/Openchat/Openchat";
import Signup from "./components/Signup";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login />}
          </Route>
          <Route path="/signup">{user ? <Home /> : <Signup />}</Route>

          <Route
            exact
            path="/openchat"
            children={user ? <Openchat /> : <Login />}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}
export default App;
