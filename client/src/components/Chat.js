import axios from "axios";
import React, { useState, useEffect } from "react";
import Loginpage from "./Loginpage";
import "../styles/chat.css";
const Chat = () => {
  const [users, setUser] = useState(null);

  const id = localStorage.getItem("userId");
  console.log(id);
  useEffect(() => {
    axios({
      method: "POST",
      url: `http://localhost:9000/chat/${id}`,
    })
      .then((response) => {
        // const { data } = response.data;
        setUser(response.data);
        console.log(response);
      })
      .catch(() => {
        console.log("Invalid Credentials!!");
      });
  }, []);
  if (users != null) {
    return (
      <main>
        <section className="container-chat">
          {users.map((user) => {
            const { name, img } = user;

            return (
              <>
                <Chathead name={name} img={img} />
              </>
            );
          })}
        </section>
      </main>
    );
  } else {
    return <Loginpage />;
  }
};

const Chathead = (props) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(true);
  const handleset = () => {
    setShow(!show);
    setMsg(!msg);
  };

  return (
    <>
      <article className="person-chat">
        <img src={props.img} alt={props.name} onClick={handleset} />
        <div>
          <h4 onClick={handleset}>{props.name}</h4>
          {show && <Openchat />}
          {msg && <p>hey how have you been</p>}
        </div>
      </article>
    </>
  );
};

const Openchat = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("abc");
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">send</button>
      </form>
    </>
  );
};

export default Chat;
