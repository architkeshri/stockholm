import Navbar from "./Navbar";
import Feedpost from "./Feedpost";
import Createpost from "./Createpost";
import API from "../utils/API";
import { useState, useEffect, useContext } from "react";
import Recommend from "./Recommend";
import "../styles/home.css";
import Openchat from "../pages/Openchat/Openchat";
import swal from 'sweetalert';
import { Link } from "react-router-dom";

const Home = ({ user, setUser }) => {
  const [feeds, setfeeds] = useState([]);
  const [recommendations, setrecommendations] = useState([]);
  
  // call following functions yo fetch feeds and recommendations on refresh
  useEffect(() => {
    callFeed();
    recommend();
 }, []);

  const recommend = () => {
    const body = {
      sexual_preference: user.user.sexual_preference,
    };
    console.log(user.user._id);
    const config = { headers: { "Content-Type": "application/json" } };
    API.post("/recommendations", body, config)
      .then((response) => {
        setrecommendations(response.data);
        console.log("data: ", response.data);
      })
      .catch(() => {
        swal("Good job!", "An unknown error occurred.", "error");
      });
  };

  // fetching feeds from /timeline route
  const callFeed = () => {
    const body = {
      userId: user.user._id,
    };
    console.log(user.user._id);
    const config = { headers: { "Content-Type": "application/json" } };
    API.post("/timeline", body, config)
      .then((response) => {
        setfeeds(response.data);
        console.log("data: ", response.data);
      })
      .catch(() => {
       
      });
    recommend();
  };

  return (
    <>
      <Navbar callFeed={callFeed} setUser={setUser} setrecommendations={setrecommendations} user={user}/>
      <div className="outer">
        <div className="inner">
          <h2>Recommendations</h2>
          <Recommend recommendations={recommendations} />
        </div>
        <div className="inner">
          <Createpost user={user} callFeed={callFeed} />
          <Feedpost feeds={feeds} />
        </div>
        {/* <div className="inner"></div> */}
        <div className="inner">
          <Openchat user={user} />
        </div>
      </div>
    
    </>
  );
};

export default Home;
