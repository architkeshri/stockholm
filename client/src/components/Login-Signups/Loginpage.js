import { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import Home from "../Home";
import Buildprofile from "./Buildprofile";
import "../../styles/loginsign.css";
const Loginpage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const changeToSignUp = () => {
    document.querySelector(".container").classList.add("sign-up-mode");
  };

  const changeToSignIn = () => {
    document.querySelector(".container").classList.remove("sign-up-mode");
  };
  return (
    <>
      {user !== null ? (
        user.activated === false ? (
          <Buildprofile user={user} setUser={setUser} />
        ) : (
          <Home user={user} setUser={setUser} />
        )
      ) : (
        <div class="container" style={{ margin: "0 0" }}>
          <div class="forms-container">
            <div class="signin-signup">
              <Login setUser={setUser} />
              <Signup setUser={setUser} />
            </div>
          </div>

          <div class="panels-container" style={{ fontWeight: "700" }}>
            <div class="panel left-panel">
              <div class="content">
                <h3>New here ?</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Debitis, ex ratione. Aliquid!
                </p>
                <button
                  class="btn transparent"
                  id="sign-up-btn"
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    borderRadius: "50px",
                  }}
                  onClick={changeToSignUp}
                >
                  Sign up
                </button>
              </div>
              <img src="icons/twoheart.png" class="image" alt="" />
            </div>
            <div class="panel right-panel">
              <div class="content">
                <h3>One of us ?</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum laboriosam ad deleniti.
                </p>
                <button
                  class="btn transparent"
                  id="sign-in-btn"
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                    borderRadius: "50px",
                  }}
                  onClick={changeToSignIn}
                >
                  Sign in
                </button>
              </div>
              <img src="icons/twoheart.png" class="image" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Loginpage;
