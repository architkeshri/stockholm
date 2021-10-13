import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./chat.css";
const Chat = () => {
  const [matches, setMachtes] = useState(null);

  //get current user from local storage

  const uid = localStorage.getItem("userId");
  // console.log(id);

  //once we get the user we send an request to api getting all the matches
  useEffect(() => {
    axios({
      method: "POST",
      url: `http://localhost:9000/chat/${uid}`,
    })
      .then((response) => {
        // const { data } = response.data;
        // matches are set to matches
        setMachtes(response.data);
        console.log(response);
      })
      .catch(() => {
        console.log("Invalid Credentials!!");
      });
  }, []);
  if (matches != null) {
    return (
      <main>
        <section className="container-chat">
          {matches.map((match) => {
            const { id, name, img } = match;

            return (
              <>
                <Link className="link" to={`/openchat/${id}`}>
                  <Chathead name={name} img={img} uid={id} />
                </Link>
              </>
            );
          })}
        </section>
      </main>
    );
  }
  return <h1>chats</h1>;
};

const Chathead = (props) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(true);
  const handleset = () => {
    setMsg(!msg);
  };

  return (
    <>
      <article className="person-chat">
        <img src={props.img} alt={props.name} onClick={handleset} />
        <div>
          <h4 onClick={handleset}>{props.name}</h4>

          {msg && <p>hey how have you been</p>}
        </div>
      </article>
    </>
  );
};

export default Chat;
