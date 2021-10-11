import { Component, useRef } from "react";
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Row, Col, Container, Stack, Button } from 'react-bootstrap';
import '../styles/login.css';
const Login = () => {
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
    const email = useRef(undefined);
    const password = useRef(undefined);
    const sendData = (e) =>{
      axios({
        method: "POST",
        url: "http://localhost:9000/login",
        data: {email: email.current.value.trim(), password: password.current.value.trim()}
      }).then(response => {
        console.log("Login success", response);
      }).catch(() => console.log("error"));
    
    }

    let login = {
      position : 'relative',
      top: '100px',
      padding: '15px'
    };
    return (
    
         <Container>
          <Row>
            <Stack direction="horizontal">
              <Container>
                <div className=""></div>
              </Container>
              <Container>
                <Container style={login}>
                  
                  <Stack gap={4}>
                    <Row>
                      <h1 style={{textAlign: "center"}}>Login</h1>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-user"></i><input type="text" placeholder="Email" ref={email}/></Col>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-lock"></i><input type="password" placeholder="Password" ref={password}/></Col>
                    </Row>
                    <Row><Col className="text-center"><Button variant="primary" size="lg" onClick={(e) => sendData(e)} active>Login</Button></Col></Row>
                    <Row className="text-center">
                      <h5>Or Sign in with social plateform</h5>
                    </Row>
                    <Row>
                      <Col className="text-center"> 
                        <GoogleLogin
                        clientId="946133447752-iu32go0864pc5pino7jkh8b8k1qafr36.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                        />
                      </Col>
                      <Col>
                        <FacebookLogin
                        //appId="347074947211845"  //main app id, requires https
                        appId="397967475101703"    //test app id 
                        autoLoad={false}
                        fields="name,email,picture" />
                      </Col>
                    </Row>
                  </Stack>
                </Container>
             </Container>
            </Stack>
          </Row>
        </Container>
    
    )
  
}

export default Login;