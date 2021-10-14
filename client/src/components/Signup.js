import "../styles/login.css";
import { Component, useRef, useState, useContext } from "react";
import axios from "axios";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import Socialauth from "./Socialauth";
import { signupCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

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
