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
import { MdVideoCall } from "react-icons/md";
import { FcEndCall } from "react-icons/fc";
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
  const [callerName, setCallerName] = useState("");
  const [smallVid, setSmallVid] = useState(true);
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
  // const [endCall, setEndCall] = useState(false);
  // refs
  const scrollRef = useRef();
  const socket = useRef();
  const userVideo = useRef(null);
  const partnerVideo = useRef();
  const peerRef = useRef();

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
      // console.log(data.name);
      setCallerName(data.name);
    });
  }, [isCalling]);

  function callPeer() {
    document.getElementById("video-calling").style.display = "block";
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
          socket.current.emit("callUser", {
            userToCall: toCall.socketId,
            signalData: data,
            from: loggedUserSocketId,
            name: user.user.name,
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

        peerRef.current = peer;

        setIsCalling(true);
      });
  }

  function acceptCall() {
    setReceivingCall(false);
    document.getElementById("video-calling").style.display = "block";
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        setCallAccepted(true);

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
        peerRef.current = peer;
      });
  }

  function endCall() {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setCallAccepted(false);
    setReceivingCall(false);
    setStream(null);
    document.getElementById("video-calling").style.display = "none";
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

  function srcShare() {
    document.getElementById("video-calling").style.display = "block";
    navigator.mediaDevices.getDisplayMedia({ cursor: true }).then((stream) => {
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
        socket.current.emit("callUser", {
          userToCall: toCall.socketId,
          signalData: data,
          from: loggedUserSocketId,
          name: user.user.name,
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

      peerRef.current = peer;

      setIsCalling(true);
    });
  }

  function srcAccepted() {
    setReceivingCall(false);
    document.getElementById("video-calling").style.display = "block";
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        setCallAccepted(true);

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
        peerRef.current = peer;
      });
  }

  // --------------------------------------------------Video of user-----------------------------------------------------------
  let UserVideo;
  if (stream) {
    // if (true) {
    UserVideo = (
      <video
        className={smallVid ? "smallVideo" : "largeVideo"}
        onClick={() => setSmallVid(!smallVid)}
        ref={userVideo}
        autoPlay
      />
    );
  }

  //sets up parter video if call is accepted
  let PartnerVideo = null;
  if (callAccepted) {
    // if (true) {
    PartnerVideo = (
      <>
        <video
          className={smallVid ? "largeVideo" : "smallVideo"}
          onClick={() => setSmallVid(!smallVid)}
          ref={partnerVideo}
          autoPlay
        />
        <div onClick={endCall} className="endCallBtn">
          End Call <i class="fas fa-phone-slash fa-xl videoCall"></i>
        </div>
      </>
    );
  }

  let incomingCall;

  if (receivingCall) {
    incomingCall = (
      <div className="incomingCall">
        <h3>{callerName || "userName"} is calling you</h3>
        <div onClick={acceptCall || srcAccepted} className="acceptCallBtn">
          Accept Call <i class="fas fa-phone fa-xl videoCall"></i>
        </div>

        {/* <button onClick={acceptCall}>Accept</button> */}
      </div>
    );
  }
  return (
    <>
      <div id="video-calling">
        <div>
          {/* <p>my video</p> */}
          {UserVideo}
        </div>

        <div>
          {/* <p>parner video</p> */}
          {PartnerVideo}
        </div>
      </div>

      <div>{incomingCall}</div>

      <div className="messenger">
        <div className="chatMenu">
          {conversations.map((c) => {
            return (
              <div
                className={active ? "sliderDeactive" : "sliderActive"}
                onClick={() => handleClick(c)}
              >
                <ChatHead conversation={c} currentUser={user} />
              </div>
            );
          })}
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
                <h4>{matchedUser?.name}</h4>

                <FaVideo
                  onClick={callPeer}
                  style={{
                    fontSize: "1.7rem",
                    marginTop: "2%",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
                <button onClick={srcShare}> ss </button>
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
                    <button onClick={() => setEmojiBtn(!emojiBtn)}>
                      <i class="far fa-smile-beam fa-lg"></i>
                    </button>
                    <textarea
                      placeholder="Type a message"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      <i class="fas fa-paper-plane fa-md"></i>
                    </button>
                  </div>

                  {emojiBtn && (
                    <Picker
                      style={{ position: "fixed" }}
                      onEmojiClick={onEmojiClick}
                      disableSearchBar={true}
                    />
                  )}
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
