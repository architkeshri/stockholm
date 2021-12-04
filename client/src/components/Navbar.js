import "../styles/Navbar.css";
import API from "../utils/API";
const Navbar = ({ callFeed, setUser, user, setrecommendations }) => {
  const sendData = (e) => {
    // e.preventDefault();
    API.get("/logout");
    setUser(null);
    
  };
  return (
    <img
          src="icons/log-out.png"
          height="5%"
          width="3%"
          alt="Logout_Icon"
          style={{position: 'fixed', right: '2%', top: '2%', cursor: 'pointer'}}
          onClick={(e) => sendData(e)}
        />
  );
};

export default Navbar;


{/* <>
      <nav>
        <img
          src="icons/love.png"
          height="18%"
          width="18%"
          alt="Feed_Icon"
          onClick={() => callFeed()}
        />
        <img
          src="icons/matches.png"
          height="18%"
          width="18%"
          alt="Match_Icon"
        />
        <img
          src="icons/profile.png"
          height="18%"
          width="18%"
          alt="Profile_Icon"
        />
        <img
          src="icons/log-out.png"
          height="18%"
          width="18%"
          alt="Logout_Icon"
          onClick={(e) => sendData(e)}
        />
      </nav>
    </> */}