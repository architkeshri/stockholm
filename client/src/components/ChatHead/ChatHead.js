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
          <div style={{padding: '5% 1% 0'}}>
            <h6><b>{user.name}</b></h6>
            <p>Hello How are you?</p>
          </div>
          
        </div>
      ) : (
        <img src="../../icons/loading.gif" width="30%" alt="Loading..."/>
      )}
    </>
  );
};

export default ChatHead;
