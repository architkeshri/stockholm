import { Component, useRef, useState } from "react";
import { Row, Col, Container, Stack, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
const Loginpage = () => {

    const [user, setUser] = useState(null);
  
    return (
      <>
        {(user !== null) ? (
          <Navbar />
        ) : (
         <Container>
          <Row>
            <Stack direction="horizontal">
              <Container>
                <Signup setUser={setUser}/>
              </Container>
              <Container>
                <Login setUser={setUser}/>
             </Container>
            </Stack>
          </Row>
        </Container>
        )}
        </>
    )
  
}

export default Loginpage;