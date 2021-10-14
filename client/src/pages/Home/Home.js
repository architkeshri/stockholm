import { Component, useRef, useState, useContext } from "react";
import { Row, Col, Container, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Home = () => {
  // const [user, setUser] = useState(null);

  return (
    <>
      <Navbar />
      <ul>
        <li>
          <Link to="/Chat"> Chat</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
