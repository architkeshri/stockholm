import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../utils/API";
import { format } from "timeago.js";

import { io } from "socket.io-client";
import "./openchat.css";

const Openchat = () => {
  const { id } = useParams();
  // const[uid,setUid] = useState('');
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [socket, setSocket] = useState(null);
  const socket = useRef();
  const [convoBetween, setConvoBetween] = useState([]);
  // const [openedChatUser, setOpenedChatUser] = useState(null);
  const scrollRef = useRef();
  // console.log(convoBetween);

  useEffect(() => {
    const getConvoBetween = async () => {
      try {
        const res = await API.get("conversation/receiver/" + id);
        setConvoBetween(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConvoBetween();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // // console.log("user", user);
  // useEffect(() => {
  //   const getMatch = async () => {
  //     const matchId = convoBetween.members?.find((m) => m !== user?.user._id);

  //     console.log("mid", matchId);
  //     try {
  //       const res = await API.get("/users/" + matchId);
  //       setOpenedChatUser(res.data);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getMatch();
  // }, []);

  // console.log(convoBetween);
  // console.log(openedChatUser);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      convoBetween?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, convoBetween]);

  useEffect(() => {
    socket.current.emit("addUser", user.user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user.user]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await API.get("/message/" + id);
        setMessages(res.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.user._id,
      text: newMessage,
      conversationId: id,
    };

    const matchId = convoBetween.members?.find((m) => m !== user?.user._id);

    socket.current.emit("sendMessage", {
      senderId: user.user._id,
      receiverId: matchId,
      text: newMessage,
    });

    try {
      const res = await API.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="messageContainer">
        <div className="topBox">
          <div>
            {messages?.map((message) => {
              return (
                <>
                  <div ref={scrollRef}>
                    <div className="topMessage">
                      <div
                        className={
                          user?.user._id === message.sender
                            ? "ownMessage"
                            : "otherMessage"
                        }
                      >
                        <img
                          className="img"
                          src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg"
                        />
                        <p>{message.text}</p>
                      </div>
                      <p className="bottomMessage">
                        {format(message.createdAt)}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="bottomBox">
          <textarea
            name="message"
            id="message"
            placeholder="Type Message.."
            cols="30"
            rows="10"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          ></textarea>
          <button type="submit" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </section>
    </>
  );
};

export default Openchat;
