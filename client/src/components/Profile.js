import "../styles/Profile.css"
import Feedpost from "./Feedpost";
const Profile = ({user, setUser, feeds}) => {
    return (
        <div class="profile-outer">
            <div class="profile-inner">
                <div class='profile-stats'>
                    <div class="profile-card">
                        <h2>5</h2>
                        <h4>Posts</h4>
                    </div>
                    <hr class="sep-line"/>
                    <div class="profile-card">
                        <h2>2</h2>
                        <h4>Matches</h4>
                    </div>
                </div>
                <hr/>
                <h3 align="center">My Posts</h3>
                <div class="my-posts">
                    
                    <div
                    style={{
                        height: "500px",
                        scrollbarWidth: "0px",
                        overflowY: "auto",
                        borderRadius: "20px",
                    }}
                    >
                    <Feedpost feeds={feeds} />
                    </div>
                </div>
            </div>
            <div class="profile-inner">
                <div class="profile-img">
                    <img src={user.user.imagesurl} height="150px" width="150px" /> 
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