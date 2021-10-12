import axios from "axios";
import React, { useState, useEffect } from "react";
import Loginpage from "./Loginpage";
import "../styles/chat.css";
const Chat = () => {
  const [users, setUser] = useState(null);
  const [show, setShow] = useState([]);

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
          {users.map((user, i) => {
            const { name, img } = user;

            return (
              <>
                <article
                  key={id}
                  className="person-chat"
                  onClick={() => setShow(!show[i])}
                >
                  <img src={img} alt={name} />
                  <div>
                    <h4>{name}</h4>
                  </div>
                  {show && <Openchat />}
                </article>
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

const Openchat = () => {
  return (
    <>
      <h1>head</h1>
    </>
  );
};

export default Chat;
