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

export default Navbar;
