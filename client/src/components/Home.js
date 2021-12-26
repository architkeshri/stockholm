import Navbar from "./Navbar";
import Feedpost from "./Feedpost";
import Createpost from "./Createpost";
import API from "../utils/API";
import { useState, useEffect } from "react";
import Recommend from "./Recommend";
import Filtersearch from './Filtersearch';
import "../styles/home.css";
import Openchat from "../pages/Openchat/Openchat";
import swal from "sweetalert";
import Profile from "./Profile";
import { MdLogout } from "react-icons/md";
import Calendar from "./Calendar";

const Home = ({ user, setUser }) => {
  const [feeds, setfeeds] = useState([]);
  const [recommendations, setrecommendations] = useState([]);
  const[showProfile, setShowProfile] = useState(false);

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
        setfeeds(
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        console.log("data: ", response.data);
      })
      .catch(() => {});
    recommend();
  };

  return (
    <div style={{ marginTop: "-1%" }}>
      {/* <Navbar
        callFeed={callFeed}
        setUser={setUser}
        setrecommendations={setrecommendations}
        user={user}
      /> */}
      <div className="outer">
        <div className="inner">
          <SideNav user={user} setUser={setUser} setShowProfile={setShowProfile} showProfile={showProfile}/>
        </div>
        {(showProfile) ? 
        <>
          <div className="inner">
            <Createpost user={user} callFeed={callFeed} />
            <div
              id="abc"
              style={{
                height: "500px",
                scrollbarWidth: "0px",
                overflowY: "auto",
                borderRadius: "20px",
              }}
            >
              <Feedpost feeds={feeds} />
            </div>
          </div>
          <div className="inner">
          
            <Filtersearch user={user} setrecommendations={setrecommendations}/>
            <h2>Recommendations</h2>
            <Recommend recommendations={recommendations} user={user} />
            
          </div></>
        :<Profile user={user} setUser={setUser} feeds={feeds}/>
        }
      </div>
    </div>
  );
};

export default Home;

const SideNav = ({ user, setUser, setShowProfile, showProfile }) => {
  const logout = (e) => {
    API.get("/logout");
    setUser(null);
  };
  let iconStyles = { color: "white", fontSize: "2em" };
  const [toggle, settoggle] = useState(0);
  return (
    <>
      <div id="profile">
        <img src={user.user.imagesurl} onClick={()=> setShowProfile(!showProfile)} title="Show Profile"/>
        <h5 id="edit-profile">My Profile</h5>
        <div className="logout">
          <MdLogout style={iconStyles} onClick={(e) => logout(e)} />
        </div>
      </div>
      <div id="match-chat">
        <div
          id="message"
          className={toggle === 0 && "line"}
          onClick={() => {
            settoggle(0);
          }}
        >
          Chat
        </div>
        <div
          id="matches"
          className={toggle === 1 && "line"}
          onClick={() => {
            settoggle(1);
          }}
        >
          Matches
        </div>

        <div
          id="dates"
          className={toggle === 2 && "line"}
          onClick={() => {
            settoggle(2);
          }}
        >
          Dates
        </div>
      </div>

      {toggle === 0 ? <Openchat user={user} /> : ( toggle ===1 ? <div id="match-section"></div>: <div id="dates-section"><Calendar user={user}/></div>)}
    </>
  );
};
