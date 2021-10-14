// import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../utils/API";

import "./chat.css";
const Chat = () => {
  const [conversations, setConversations] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await API.get("/conversation/" + user.user._id);

        setConversations(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, []);
  if (conversations.length !== 0) {
    return (
      <main>
        <section className="container-chat">
          {conversations.map((conversation) => {
            return (
              <>
                <Link className="link" to={`/openchat/${conversation._id}`}>
                  <Chathead conversation={conversation} currentUser={user} />
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

const Chathead = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(true);
  const handleset = () => {
    setMsg(!msg);
  };

  useEffect(() => {
    const matchId = conversation.members.find(
      (m) => m !== currentUser.user._id
    );

    const getMatch = async () => {
      const res = await API.get("/users/" + matchId);
      setUser(res.data);
    };

    getMatch();
  }, [currentUser, conversation]);
  return (
    <>
      {user ? (
        <article className="person-chat">
          <img
            src={
              " https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"
            }
            alt={user.name}
            onClick={handleset}
          />
          <div>
            <h4 onClick={handleset}>{user.name}</h4>
            {/* TODO: Show New messages here */}
            {msg && <p>See Messages</p>}
          </div>
          {/* <h1>{user ? user.name : "userName"}</h1> */}
        </article>
      ) : (
        <p>loadig...</p>
      )}
    </>
  );
};

export default Chat;
