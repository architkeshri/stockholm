import '../styles/login.css';
import { Component, useRef} from "react";
//import axios from 'axios';
import API from '../utils/API';
import { Row, Col, Container, Stack, Button } from 'react-bootstrap';
import Socialauth from './Socialauth';
const Login = ({setUser}) => {
    
    const email = useRef(undefined);
    const password = useRef(undefined);
    const sendData = (e) =>{
      const body = {email: email.current.value.trim(), password: password.current.value};
      const config = {headers: {"Content-Type": "application/json"}};
      API.post("/login",body,config)
      //axios({
      //  method: "POST",
      //  url: "http://localhost:9000/login",
      //  data: {email: email.current.value.trim(), password: password.current.value}}
        .then(response => {
        setUser(response.data);
        console.log("Login success", response);
      }).catch(() => {
        alert("Invalid Credentials!!");
        console.log("Invalid Credentials!!");
      })
    
    }

    let login = {
        position : 'relative',
        top: '100px',
        padding: '15px'
      };
    return(
        <>
            <Container style={login}>
                  
                  <Stack gap={4}>
                    <Row>
                      <h1 style={{textAlign: "center"}}>Log in</h1>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-user"></i><input type="text" placeholder="Email" ref={email}/></Col>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-lock"></i><input type="password" placeholder="Password" ref={password}/></Col>
                    </Row>
                    <Row><Col className="text-center"><Button variant="primary" size="lg" onClick={(e) => sendData(e)} active>Login</Button></Col></Row>
                    <Row className="text-center">
                      <h5>Or Sign in with social platforms</h5>
                    </Row>
                    <Row>
                        <Socialauth setUser={setUser}/>
                    </Row>
                  </Stack>
                </Container>
        </>
    )
}

export default Login;