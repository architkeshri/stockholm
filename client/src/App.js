import React, { Component } from "react";
import Loginpage from "./components/Loginpage";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./components/Chat";
class App extends Component {
  render() {
    return (
      <>
        <Loginpage />
        {/* if user is logged in then show this part */}
        <Chat />
      </>
    );
  }
}
export default App;
