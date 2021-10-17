<<<<<<< HEAD
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <img src="icons/love.png" height="18%" width="18%" />
      <img src="icons/matches.png" height="18%" width="18%" />
      <img src="icons/profile.png" height="18%" width="18%" />
      <Link to="/openchat">
        <img src="icons/chat.png" height="18%" width="18%" />
      </Link>
    </nav>
  );
};
||||||| cab6ddf
import '../styles/Navbar.css'
const Navbar = () => {
    return(
        <nav>
            <img src="icons/love.png" height= "18%" width= "18%"/>
            <img src="icons/matches.png"  height= "18%" width= "18%"/>
            <img src="icons/profile.png" height= "18%" width= "18%"/>
        </nav>
    );
}
=======
import '../styles/Navbar.css'



const Navbar = ({callFeed, setUser}) => {
    const sendData = (e) => {
        // e.preventDefault();
        // API.get("/logout");
        setUser(null);
    }
    return(
        <>
        <nav>
            <img src="icons/love.png" height= "18%" width= "18%" alt="Feed_Icon" onClick={()=>callFeed()}/>
            <img src="icons/matches.png" height= "18%" width= "18%" alt="Match_Icon"/>
            <img src="icons/profile.png" height= "18%" width= "18%" alt="Profile_Icon"/>
            <img src="icons/log-out.png" height= "18%" width= "18%" alt="Logout_Icon" onClick={(e) => sendData(e)}/>
        </nav>
        
        
       </> 
    );
}
>>>>>>> main

export default Navbar;
