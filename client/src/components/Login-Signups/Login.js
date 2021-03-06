import "../../styles/loginsign.css";
import { useRef} from "react";
import API from "../../utils/API";
import Socialauth from "./Socialauth";
import { Row } from "react-bootstrap";
import swal from "sweetalert";
const Login = ({ setUser }) => {
  const email = useRef(undefined);
  const password = useRef(undefined);
  const sendData = (e) => {
    if (email.current.value === "") console.log("yes");
    const body = {
      email: email.current.value.trim(),
      password: password.current.value,
    };
    const config = { headers: { "Content-Type": "application/json" } };
    API.post("/login", body, config)
      .then((response) => {
        setUser(response.data);

        console.log("Login success", response);
      })
      .catch(() => {
        swal('Invalid Credentials', '', 'error')
        console.log("Invalid Credentials!!");
      });
  };

  return (
    <div id="form" class="sign-in-form">
      <h2 class="title">Sign in</h2>
      <div class="input-field">
        <i class="fas fa-envelope"></i>
        <input type="text" placeholder="Email" ref={email} required />
      </div>
      <div class="input-field">
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="Password" ref={password} required />
      </div>
      <button
        style={{
          backgroundColor: "#5995fd",
          fontWeight: "700",
          color: "white",
          borderRadius: "49px",
        }}
        class="btn solid"
        onClick={(e) => sendData(e)}
      >
        Login
      </button>
      <p class="social-text">Or Sign in with social platforms</p>
      <Row>
      <Socialauth setUser={setUser} />
      </Row>
    </div>
  );
};

export default Login;
