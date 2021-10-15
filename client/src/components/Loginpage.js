import { Component, useRef, useState, useEffect } from "react";
import { Row, Col, Container, Stack, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Buildprofile from './Buildprofile';
const Loginpage = () => {

    const [user, setUser] = useState(null);

    // useEffect(() => {
    //   setUser(window.localStorage.getItem('user'));
    // }, [])

    // useEffect(() => {
    //   window.localStorage.setItem('user', user);
    // }, [user]);

    return (
      <>
        {(user !== null) ? 
          ((user.activated == false) ?
            <Buildprofile user={user} setUser={setUser}/> : <Home user={user} setUser={setUser}/>
          
          
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