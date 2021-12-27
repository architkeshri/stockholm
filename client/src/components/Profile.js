import { useState } from "react";
import "../styles/Profile.css"
import Myposts from "./Myposts";
const Profile = ({user, setUser, feeds, setVisible}) => {
    const [postCount, setpostCount] = useState(0);
    return (
        <div class="profile-outer">
            <div class="profile-inner">
                <div class='profile-stats'>
                    <div class="profile-card">
                        <h2>{postCount}</h2>
                        <h4>Posts</h4>
                    </div>
                    <hr class="sep-line"/>
                    <div class="profile-card">
                        <h2 color="red">{user.user.matches.length}</h2>
                        <h4>Matches</h4>
                    </div>
                </div>
                <hr/>
                <h3 align="center">My Posts</h3>
                <div class="my-posts">
                    
                    <div
                    style={{
                        height: "500px",
                        width: "100%",
                        scrollbarWidth: "0px",
                        overflowY: "auto",
                        borderRadius: "20px",
                    }}
                    >
                    <Myposts id={user.user._id} feeds={feeds} setpostCount={setpostCount}/>
                    </div>
                </div>
            </div>
            <div class="profile-inner">
                <div class="profile-img">
                    <img src={user.user.imagesurl} height="200px" width="200px" /> 
                    <h2>{user.user.name}</h2>
                    <h4>{user.user.about}</h4>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Profile;