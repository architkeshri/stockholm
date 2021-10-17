//import axios from 'axios';
import API from '../utils/API';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Row, Col } from 'react-bootstrap';
const Socialauth = ({setUser}) => {
    const responseSuccessGoogle = (response) => {    //function called for login/signup with Google: success
        //console.log(response);
        const body = {tokenId: response.tokenId};
        const config = {headers: {"Content-Type":"application/json"}};
        API.post("/googlelogin",body,config)
        //axios({
        //  method: "POST",
        //  url: "http://localhost:9000/googlelogin",
        //  data: { tokenId: response.tokenId }})
          .then(response => {
          //setUser(response.profileObj);
          setUser(response.data);
          console.log("Google Login success", response);
        })
      }
  
      const responseErrorGoogle = (response) => {      //function called for login/signup with Google: error
        console.log(response);
      }
  
      const responseFacebook = (response) => {        //function called for login/signup with facebook
        //console.log("FB login success!", response);
        const body = {accessToken: response.accessToken, userID: response.userID};
        const config = {headers: {"Content-Type":"application/json"}};
        API.post("/facebooklogin",body,config)
        //axios({
        //  method: "POST",
        //  url: "http://localhost:9000/facebooklogin",
        //  data: { accessToken: response.accessToken, userID: response.userID }})
        .then(response => {
            setUser(response.data);
          console.log("Facebook Login success", response);
        })
      }
  
    return(
        <>
        <Row>
          <Col className="text-center"> 
              <GoogleLogin
              clientId="946133447752-iu32go0864pc5pino7jkh8b8k1qafr36.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
              />
          </Col>
          <Col>
              <FacebookLogin
              //appId="347074947211845"  //main app id, requires https
              appId="397967475101703"    //test app id 
              autoLoad={false}
              fields="name,email,picture" />
          </Col>
        </Row>
        </>
    )
}

export default Socialauth;