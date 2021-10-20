import Navbar from "./Navbar";
import Feedpost from "./Feedpost";
import Createpost from "./Createpost";
import API from "../utils/API";
import { useState, useEffect} from "react";
import Recommend from "./Recommend";
import "../styles/home.css";
import Openchat from "../pages/Openchat/Openchat";
import swal from 'sweetalert';

const Home = ({ user, setUser }) => {
  const [feeds, setfeeds] = useState([]);
  const [recommendations, setrecommendations] = useState([]);
  
  // call following functions yo fetch feeds and recommendations on refresh
  useEffect(() => {
    if (feeds) {
      callFeed();
    }
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
        setfeeds(response.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
        console.log("data: ", response.data);
      })
      .catch(() => {
       
      });
    recommend();
  };

  return (
    <div style={{marginTop: '-1%', background: 'linear-gradient(200deg, rgba(247,147,23,0.6) 26%, rgba(248, 23, 94, 0.7) 83%)'}}>
      <Navbar callFeed={callFeed} setUser={setUser} setrecommendations={setrecommendations} user={user}/>
      <div className="outer">
        <div className="inner">
          <h2>Recommendations</h2>
          <Recommend recommendations={recommendations} user={user} />
        </div>
        <div className="inner">
          <Createpost user={user} callFeed={callFeed} />
          <div id="abc" style={{height: '500px', scrollbarWidth: '0px', overflowY: 'auto', borderRadius: '20px'}}>
          <Feedpost feeds={feeds} />
          </div>
          
        </div>
        {/* <div className="inner"></div> */}
        <div className="inner">
          <Openchat user={user} />
        </div>
      </div>
    
    </div>
  );
};

export default Home;
