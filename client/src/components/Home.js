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
import Popup from 'react-animated-popup'
import { MdLogout } from "react-icons/md";
import Calendar from "./Calendar";

const Home = ({ user, setUser }) => {
  const [feeds, setfeeds] = useState([]);
  const [recommendations, setrecommendations] = useState([]);
  const[showProfile, setShowProfile] = useState(true);
  //show Profile Popup in feedpost
  const [visible, setVisible] = useState({details: null, vis: false});
  const [temp, settemp] = useState([]);
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

    const config = { headers: { "Content-Type": "application/json" } };
    API.post("/timeline", body, config)
      .then((response) => {
        
          response.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
          response.data.forEach((item)=>{
            API.get(`/users/${item.userId}`,{userId: item.userId},{ headers: { "Content-Type": "application/json" }})
            .then(rest => {
              
                settemp(temp.push({... item, userInfo: rest.data}));
            }).catch((err) => {
                console.log(err);
            })
          })
      })
      .catch(() => {})
      .finally(()=>{
        setfeeds(temp);
      });
    recommend();
  };
  
  return (
    <div style={{ marginTop: "-1%" }}>
    
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
              <Feedpost feeds={feeds} visible={visible} setVisible={setVisible}/>
              <Popup visible={visible.vis} style={{ width: '500px' }} onClose={() => setVisible({details: null, vis: false})}>
                <img src={visible.details?.imagesurl} style={{ width: '50%', height: '150px', borderRadius: '50%', marginLeft: '25%', objectFit: 'cover'}} alt=""/>
                <h3 style={{textAlign: 'center'}}>{visible.details?.name}</h3>
                <h6 style={{textAlign: 'center', color: '#565656'}}>{visible.details?.about}</h6>
              </Popup>
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
        <img src={user.user.imagesurl} onClick={()=> setShowProfile(!showProfile)} title="Show Profile" height="80px"/>
        <h5 id="edit-profile">{user.user.name}</h5>
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
