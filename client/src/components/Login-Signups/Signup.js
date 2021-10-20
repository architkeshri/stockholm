import { useRef } from "react";
import API from "../../utils/API";
import swal from "sweetalert";
const Signup = ({ setUser }) => {
  const name = useRef(undefined);
  const email = useRef(undefined);
  const password = useRef(undefined);
  let validated = false;
  const validate = () => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.current.value) === false){
      swal('Invalid', '', 'warning');
    }
    else if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(password.current.value) === false){
      swal('Weak Password', 'Password must contain minimum 8 characters, at least one numeric digit and a special character.', 'warning');
    }
    else{
      validated = true;
    }

  }

  const sendData = (e) => {
      validate();
      if(validated === true){
        const body = {name: name.current.value.trim(), email: email.current.value.trim(), password: password.current.value};
        const config = {headers: {"Content-Type":"application/json"}};
        API.post("/signup",body,config)
        
          .then(response => {
          setUser(response.data);
          console.log("Login success", response);
        }).catch(() => {
          swal('User Already Exist', '', 'error');
          console.log("error");
        })
      }
      
  };
  return (
    <>
      <div id="form" class="sign-up-form">
        <h2 class="title">Sign up</h2>
        <div class="input-field">
          <i class="fas fa-user"></i>
          <input type="text" placeholder="Username" ref={name} />
        </div>
        <div class="input-field">
          <i class="fas fa-envelope"></i>
          <input type="email" placeholder="Email" ref={email} />
        </div>
        <div class="input-field">
          <i class="fas fa-lock"></i>
          <input type="password" placeholder="Password" ref={password} />
        </div>
        <input
          type="submit"
          style={{
            backgroundColor: "#5995fd",
            color: "#fff",
            fontWeight: "700",
            borderRadius: "49px",
          }}
          class="btn"
          value="Sign up"
          onClick={(e) => sendData(e)}
        />
      </div>
    </>
  );
};

export default Signup;
