//css files
import "./openchat.css";

//node pacakages
import React, { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import { io } from "socket.io-client";

// Api calls
import API from "../../utils/API";

// components
import Message from "../../components/Message/Message";
import ChatHead from "../../components/ChatHead/ChatHead";

const Openchat = ({ user }) => {
  //states

  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [emojiBtn, setEmojiBtn] = useState(false);
  const [emojiObj, setEmojiObj] = useState(null);

  // refs
  const scrollRef = useRef();
  const socket = useRef();

  // connect to web socket and get the message from socket

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  // add new message to messages
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user.user]);

  // API call to conversation/:id to get all conversation of the current user
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
  }, [user.user._id]);

  // of All the conversations currentChat contains the opened chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await API.get("/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // filtering out array to get the other user .ie a match

    const matchId = currentChat.members?.find((m) => m !== user?.user._id);

    socket.current.emit("sendMessage", {
      senderId: user.user._id,
      receiverId: matchId,
      text: newMessage,
    });
    // post in Message table
    try {
      const res = await API.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const onEmojiClick = (e, emojiObj) => {
    setEmojiObj(emojiObj);
    setNewMessage(newMessage + emojiObj?.emoji);
  };
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => {
              return (
                <>
                  <div onClick={() => setCurrentChat(c)}>
                    <ChatHead conversation={c} currentUser={user} />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => {
                    return (
                      <>
                        <div ref={scrollRef}>
                          <Message
                            message={message}
                            own={message.sender === user.user._id}
                          />
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                  <button
                    onClick={() => setEmojiBtn(!emojiBtn)}
                    className="chatSubmitButton"
                  >
                    Emoji
                  </button>

                  {emojiBtn && (
                    <Picker
                      onEmojiClick={onEmojiClick}
                      disableSearchBar={true}
                    />
                  )}
                </div>
              </>
            ) : (
              <h1>Open a convo</h1>
            )}
          </div>
        </div>

        <div className="matches">
          <p>All the new Matches goes here</p>
        </div>
      </div>
    </>
  );
};
export default Openchat;
