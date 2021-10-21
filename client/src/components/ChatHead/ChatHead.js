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
        <div className="person-chat">
          <img src={user.imagesurl} alt={user.name} />
          <h5>{user.name}</h5>
        </div>
      ) : (
        <img src="../../icons/loading.gif" width="30%" alt="Loading..."/>
      )}
    </>
  );
};

export default ChatHead;
