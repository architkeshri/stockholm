import Navbar from "./Navbar";
import Feedpost from './Feedpost';
import Createpost from './Createpost'
import API from '../utils/API';
import { useState } from "react";

const Home = ({user, setUser}) => {
    const [feeds, setfeeds] = useState([])
    const callFeed = () => {
        const body = {
            userId: user.user._id
        };
        console.log(user.user._id);
      const config = {headers: {"Content-Type": "application/json"}};
      API.post("/timeline",body,config)
        .then(response => {
            setfeeds(response.data);
        console.log("data: ", response.data);
      }).catch(() => {
        alert("Error Occured!!");
      })
    }

    return(
        <>
            <Navbar callFeed={callFeed} setUser={setUser}/>
            <Createpost user={user}/>
            <Feedpost feeds={feeds} />
        </>
    )
}

export default Home;