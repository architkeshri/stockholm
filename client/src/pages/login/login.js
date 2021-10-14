import "./login.css";
import { Component, useRef, useContext } from "react";
import axios from "axios";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import Socialauth from "../../components/Socialauth";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import Signup from "../../components/Signup";
import { Link } from "react-router-dom";
const Login = () => {
  const email = useRef(undefined);
  const password = useRef(undefined);
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const sendData = (e) => {
    loginCall(
      {
        email: email.current.value.trim(),
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user, isFetching, error);
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
            <h1 style={{ textAlign: "center" }}>Log in</h1>
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
                Login
              </Button>
            </Col>
          </Row>
          <Row className="text-center">
            <h5>Or Sign in with social plateform</h5>
          </Row>
          <Row>
            <Socialauth />
          </Row>
        </Stack>
      </Container>
      <Link to="/signup"> Register</Link>
    </>
  );
};

export default Login;
