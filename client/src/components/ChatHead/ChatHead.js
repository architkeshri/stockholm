import React, { useState, useEffect } from "react";
import "./ChatHead.css";
import API from "../../utils/API";

const ChatHead = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const matchId = conversation.members.find(
      (m) => m !== currentUser.user._id
    );

    const getMatch = async () => {
      try {
        const res = await API.get("/users/" + matchId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMatch();
  }, [currentUser, conversation]);
  return (
    <>
      {user ? (
        <article className="person-chat" style={{ cursor: "pointer" }}>
          <img src={user.imagesurl} alt={user.name} />

          <h5 style={{ fontSize: "16px" }}>{user.name}</h5>

          {/* <h1>{user ? user.name : "userName"}</h1> */}
        </article>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default ChatHead;
