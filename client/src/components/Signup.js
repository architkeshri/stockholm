<<<<<<< HEAD
import "../styles/login.css";
import { Component, useRef, useState, useContext } from "react";
import axios from "axios";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import Socialauth from "./Socialauth";
import { signupCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
||||||| cab6ddf
import '../styles/login.css';
import { Component, useRef, useState } from "react";
import axios from 'axios';
import { Row, Col, Container, Stack, Button } from 'react-bootstrap';
import Socialauth from './Socialauth';
const Signup = ({setUser}) => {
    const name = useRef(undefined);
    const email = useRef(undefined);
    const password = useRef(undefined);
    const sendData = (e) =>{
      axios({
        method: "POST",
        url: "http://localhost:9000/signup",
        data: {name: name.current.value.trim(), email: email.current.value.trim(), password: password.current.value}
      }).then(response => {
        setUser(response.data);
        console.log("Login success", response);
      }).catch(() => {
        alert("Invalid Credentials!!");
        console.log("error");
      })
    
    }
=======
import '../styles/loginsign.css';
import { useRef } from "react";
//import axios from 'axios';
import API from '../utils/API';

const Signup = ({setUser}) => {
    const name = useRef(undefined);
    const email = useRef(undefined);
    const password = useRef(undefined);
    const sendData = (e) =>{
      const body = {name: name.current.value.trim(), email: email.current.value.trim(), password: password.current.value};
      const config = {headers: {"Content-Type":"application/json"}};
      API.post("/signup",body,config)
      
        .then(response => {
        setUser(response.data.user);
        console.log("Login success", response);
      }).catch(() => {
        alert("Invalid Credentials!!");
        console.log("error");
      })
    
    }
>>>>>>> main

<<<<<<< HEAD
const Signup = ({ setUser }) => {
  const name = useRef(undefined);
  const email = useRef(undefined);
  const password = useRef(undefined);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const sendData = (e) => {
    // axios({
    //   method: "POST",
    //   url: "http://localhost:9000/signup",
    //   data: {
    //     name: name.current.value.trim(),
    //     email: email.current.value.trim(),
    //     password: password.current.value,
    //   },
    // })
    //   .then((response) => {
    //     setUser(response.data);
    //     localStorage.setItem("userId", response.data.user);
    //     console.log("Login success", response);
    //   })
    //   .catch(() => {
    //     alert("Invalid Credentials!!");
    //     console.log("error");
    //   });
    signupCall(
      {
        name: name.current.value.trim(),
        email: email.current.value.trim(),
        password: password.current.value,
      },
      dispatch
    );
  };
||||||| cab6ddf
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
                      <h1 style={{textAlign: "center"}}>Sign up</h1>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-user"></i><input type="text" placeholder="Username" ref={name}/></Col>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-user"></i><input type="text" placeholder="Email" ref={email}/></Col>
                    </Row>
                    <Row>
                      <Col className="text-center"><i class="fas fa-lock"></i><input type="password" placeholder="Password" ref={password}/></Col>
                    </Row>
                    <Row><Col className="text-center"><Button variant="primary" size="lg" onClick={(e) => sendData(e)} active>Signup</Button></Col></Row>
                </Stack>
            </Container>
        </>
    )
}
=======
    return(
        <>
           

          <div id="form" class="sign-up-form">
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" ref={name}/>
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" ref={email}/>
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" ref={password}/>
            </div>
            <input style={{ backgroundColor: '#5995fd', color: '#fff', fontWeight: '700', borderRadius: '49px'}} class="btn" value="Sign up" onClick={(e) => sendData(e)}/>
          </div>
        </>
    )
}
>>>>>>> main

  console.log("signupCall");
  console.log(user);

  let login = {
    position: "relative",
    top: "100px",
    padding: "15px",
  };
  return (
    <>
      <Container style={login}>
        <Stack gap={4}>
          <Row>
            <h1 style={{ textAlign: "center" }}>Sign up</h1>
          </Row>
          <Row>
            <Col className="text-center">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" ref={name} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Email" ref={email} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" ref={password} />
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={(e) => sendData(e)}
                active
              >
                Signup
              </Button>
            </Col>
          </Row>
        </Stack>
      </Container>
    </>
  );
};

export default Signup;
