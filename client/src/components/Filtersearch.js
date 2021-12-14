import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import API from '../utils/API';
import "../styles/filtersearch.css";
import { useState } from 'react';
import Interest from './Login-Signups/Interest';
import Popup from 'react-animated-popup'
const Filtersearch = ({ user, setrecommendations }) => {
    // var [results, setresults] = useState();
    const [maxage, setmaxage] = useState();
    const [maxdistance, setdistance] = useState();
    const [interests, setinterests] = useState([]);
    const [visible, setVisible] = useState(false);


    const filtersearch = () => {
        //interests = interests?.split(',');
        console.log("Coordinate", user.user.location.coordinates[1]);
        const body = {
            latitude: user.user.location.coordinates[1],
            longitude: user.user.location.coordinates[0],
            maxDistance: maxdistance,
            maxage: maxage,
            interests: interests,
            pref: user.user.sexual_preference
        }
        const config = { headers: { "Content-Type": "application/json" } };
        API.post("/filtersearch", body, config)
            .then((response) => {
                console.log(response);
                setrecommendations(response.data);
                // setresults(response.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    // const handleLike = (ID) => {
    //     const body = {
    //         userId: user.user._id
    //     }
    //     const config = { headers: { "Content-Type": "application/json" } };
    //     console.log(body, ID);
    //     API.put(`/${ID}/like`, body, config)
    //         .then(response => {
    //             console.log(response);
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }

    // const print = results?.map((item) => {
    //     return (

    //         <Carousel.Item className="recommend-card">
    //             <img
    //                 className="d-block w-100"
    //                 src={item.imagesurl}
    //                 alt="Image One"
    //             />
    //             <Carousel.Caption>
    //                 <h4>{item.name}</h4>
    //                 <span onClick={() => handleLike(item._id)}><i class="fas fa-heart fa-3x"></i></span>
    //             </Carousel.Caption>
    //         </Carousel.Item>
    //     )
    // })

    const handleValue = () => {
        var output1 = document.getElementById("sliderage");
        output1.innerHTML = maxage;
        var output2 = document.getElementById("sliderdist");
        output2.innerHTML = maxdistance;
    }

    return (
        <>
            <button onClick={() => {setVisible(true)}} style={{backgroundColor: 'white', border: 'none', marginLeft: '90%', marginTop: '5%'}}><img src="icons/filter.png" width="100%"></img></button>
            <Popup visible={visible} style={{ width: '500px' }} onClose={() => setVisible(false)}>
                <div >
                    <input className="slider"
                        id="ageinp"
                        type="range"
                        min="18" max="100"
                        value={maxage}
                        onChange={(e) => { setmaxage(e.target.value); handleValue() }}
                        step="1" />
                </div>
                <div>
                    <p>Max Age: <span id="sliderage"></span></p>
                </div>
                <div >
                    <input className="slider"
                        id="distinp"
                        type="range"
                        min="0" max="2000"
                        value={maxdistance}
                        onChange={(e) => { setdistance(e.target.value); handleValue() }}
                        step="5" />
                </div>
                <div>
                    <p>Max Distance: <span id="sliderdist"></span> KM</p>
                </div>

                Interests:
                <div className="interests" style={{ margin: '5px', width: '100%', whiteSpace: 'nowrap', padding: '2%', overflowX: 'scroll' }}>
                    <Tabs interests={interests} />
                </div>
                <Interest interest={interests} setinterest={setinterests} />

                <div>
                    <button className="submitbtn" size="xl" onClick={() => filtersearch()} active>Search</button>
                </div>
            </Popup>
            {/* <div>
                <Carousel style={{ borderRadius: '50px' }}>
                    {print}
                </Carousel>
            </div> */}


        </>
    )
}

const Tabs = ({ interests }) => {
    const print = interests.map((item) => {
        return (
            <span class="tabs">{item}</span>
        )
    })
    return (
        <>
            {print}
        </>
    )
}

export default Filtersearch;

