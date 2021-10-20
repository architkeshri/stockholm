//css files
import "./openchat.css";

//node pacakages
import React, { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

//sockets
import { io } from "socket.io-client";
import Peer from "simple-peer";

//Icons
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaVideo } from "react-icons/fa";

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
  const [matchedUser, setMatchedUser] = useState(null);
  const [active, setActive] = useState(false);

  const [connectedUser, setConnectedUser] = useState([]);

  //Video chat
  const [loggedUserSocketId, setLoggedUserSocketId] = useState("");

  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [caller, setCaller] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);

  const [isCamera, setIsCamera] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  let callCheck = false;
  let callReceived = false;
  // refs
  const scrollRef = useRef();
  const socket = useRef();
  const userVideo = useRef(null);
  const partnerVideo = useRef();

  // ---------------------------------------------------------------Messages START---------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------------------------------------

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
    // for video call
    socket.current.on("LoggedUserSocketId", (socketId) => {
      setLoggedUserSocketId(socketId);
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
      setConnectedUser(users);

      console.log(users);
    });
  }, [user.user]);

  console.log(connectedUser);

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
    const getMatchedUser = async () => {
      try {
        const matchId = currentChat.members?.find((m) => m !== user?.user._id);

        const res = await API.get("/users/" + matchId);
        setMatchedUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMatchedUser();
  }, [currentChat]);

  console.log(matchedUser);
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

  // -------------------------------------------------Messages END-------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------Video Call START-----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------------------------------------

  // from socket when hey is triggerd => call is initaited by a peer (user 1) and data conatins ice credntialas and sdp to be sent to user 2
  //  so that it can communicate with user 2
  useEffect(() => {
    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, [isCalling]);

  function callPeer() {
    callCheck = true;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        const matchId = currentChat.members?.find((m) => m !== user?.user._id);

        console.log(matchId);

        console.log("connected user", connectedUser);

        const toCall = connectedUser.find((user) => user.userId === matchId);
        console.log("tc", toCall.socketId);
        console.log("cu", loggedUserSocketId);

        peer.on("signal", (data) => {
          setIsCalling(true);
          socket.current.emit("callUser", {
            userToCall: toCall.socketId,
            signalData: data,
            from: loggedUserSocketId,
          });
        });

        peer.on("stream", (stream) => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });
        socket.current.on("callAccepted", (signal) => {
          setCallAccepted(true);
          peer.signal(signal);
        });

        setIsCalling(true);
      });
  }

  function acceptCall() {
    setReceivingCall(false);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        setCallAccepted(true);
        callReceived = true;
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", (data) => {
          socket.current.emit("acceptCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
          partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
      });
  }

  // ---------------------------------------------------------------------Video Call END-------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------------------------------------------------

  //Emoji Picker
  const onEmojiClick = (e, emojiObj) => {
    setEmojiObj(emojiObj);
    setNewMessage(newMessage + emojiObj?.emoji);
  };
  const handleClick = (c) => {
    setCurrentChat(c);
    setActive(!active);
  };

  // --------------------------------------------------Video of user-----------------------------------------------------------
  let UserVideo;
  if (stream) {
    UserVideo = <video ref={userVideo} autoPlay />;
  }

  //sets up parter video if call is accepted
  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <video ref={partnerVideo} autoPlay />;
  }

  let incomingCall;

  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }
  return (
    <>
      <div>{UserVideo}</div>

      <div>{PartnerVideo}</div>

      <div>{incomingCall}</div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => {
              return (
                <>
                  <div className={active ? "sliderDeactive" : "sliderActive"}>
                    <div onClick={() => handleClick(c)}>
                      <ChatHead conversation={c} currentUser={user} />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className={active ? "sliderActive" : "sliderDeactive"}>
          <div className="chatBox">
            {currentChat && (
              <div className="matchInfo">
                <div onClick={() => setActive(!active)} className="backIcon">
                  <IoMdArrowRoundBack />
                </div>
                <img
                  src={matchedUser?.imagesurl}
                  alt=""
                  className="matchInfoImg"
                />

                <h3>{matchedUser?.name}</h3>

                <FaVideo onClick={callPeer} className="videoCall" />
              </div>
            )}

            <div
              className={currentChat ? "chatBoxWrapper" : "chatBoxWrapperFalse"}
            >
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
                  
                        <button
                          onClick={() => setEmojiBtn(!emojiBtn)}
                          className="chatSubmitButton"
                        >
                          <i class="far fa-smile-beam fa-lg"></i>
                        </button>
                        <textarea
                          
                          placeholder="Type a message"
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>
                        <i class="far fa-paper-plane fa-lg"></i>
                        </button>
                    
                    
                  </div>
                  <div className="chatBoxBottom">
                    {emojiBtn && (
                      <Picker 
                        style={{width: '120%'}}
                        onEmojiClick={onEmojiClick}
                        disableSearchBar={true}
                      />
                    )} 
                  </div>
                </>
              ) : (
                <h3 className="noConversationText">Open a convo</h3>
              )}
            </div>
          </div>
        </div>

        {/* <div className="matches">
          <div className="matchesWrapper">
            <p>All the new Matches goes here</p>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Openchat;
