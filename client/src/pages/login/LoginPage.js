import { Component, useRef, useState } from "react";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Signup from "../../components/Signup";
import Login from "../../components/Login";
const Loginpage = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      {user !== null ? (
        <Navbar />
      ) : (
        <Container>
          <Row>
            <Stack direction="horizontal">
              <Container>
                <Signup setUser={setUser} />
              </Container>
              <Container>
                <Login setUser={setUser} />
              </Container>
            </Stack>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Loginpage;
