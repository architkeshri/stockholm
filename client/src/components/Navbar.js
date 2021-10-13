import '../styles/Navbar.css'
import API from '../utils/API';

const Navbar = ({user, setUser}) => {
    const sendData = (e) => {
        API.get("/logout");
        setUser(null);
    }
    return(
        <>
        <nav>
            <img src="icons/love.png" height= "18%" width= "18%"/>
            <img src="icons/matches.png" height= "18%" width= "18%"/>
            <img src="icons/profile.png" height= "18%" width= "18%"/>
            <img src="icons/log-out.png" height= "18%" width= "18%" onClick={(e) => sendData(e)}/>
        </nav>
        <h2>{user.name}</h2>
       </> 
    );
}

export default Navbar;