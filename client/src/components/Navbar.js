import '../styles/Navbar.css'
import API from '../utils/API';

const Navbar = () => {
    const sendData = (e) => {
        API.get("/logout");
    }
    return(
        <nav>
            <img src="icons/love.png" height= "18%" width= "18%"/>
            <img src="icons/matches.png"  height= "18%" width= "18%"/>
            <img src="icons/profile.png" height= "18%" width= "18%"/>
            <img src="icons/profile.png" height= "18%" width= "18%" onClick={(e) => sendData(e)}/>
        </nav>
    );
}

export default Navbar;