import React, { Component } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Navbar from './components/Navbar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentDidMount() {
    this.callAPI();
  }
  render() {
    const responseSuccessGoogle = (response) => {    //function called for login/signup with Google: success
      console.log(response);
      axios({
        method: "POST",
        url: "http://localhost:9000/googlelogin",
        data: { tokenId: response.tokenId }
      }).then(response => {
        console.log("Google Login success", response);
      })
    }

    const responseErrorGoogle = (response) => {      //function called for login/signup with Google: error
      console.log(response);
    }

    const responseFacebook = (response) => {        //function called for login/signup with facebook
      console.log("FB login success!", response);
      axios({
        method: "POST",
        url: "http://localhost:9000/facebooklogin",
        data: { accessToken: response.accessToken, userID: response.userID }
      }).then(response => {
        console.log("Facebook Login success", response);
      })
    }

    return (
      <div className="App">
        <div className="App-intro">
          <h1>Login with Google/ FB</h1>
          {/**Button for Google Login */}
          <GoogleLogin
            clientId="946133447752-iu32go0864pc5pino7jkh8b8k1qafr36.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <div>
          {/**Button for Facebook Login */}
          <FacebookLogin
            //appId="347074947211845"  //main app id, requires https
            appId="397967475101703"    //test app id 
            autoLoad={false}
            fields="name,email,picture"
            //onClick={componentClicked}
            callback={responseFacebook} />,
        </div>
        <Navbar />

      </div>
    );
  }
}
export default App;
