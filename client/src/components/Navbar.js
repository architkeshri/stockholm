import "../styles/Navbar.css";

const Navbar = ({ callFeed, setUser, user }) => {
  const sendData = (e) => {
    // e.preventDefault();
    // API.get("/logout");
    setUser(null);
  };
  return (
    <>
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
    </>
  );
};

export default Navbar;
