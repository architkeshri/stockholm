import { Stack, Row, Col, Button } from "react-bootstrap";
import { useRef, useState } from "react";
import API from '../../utils/API';
import Interest from './Interest';
import '../../styles/buildprofile.css';
import swal from 'sweetalert';
const Buildprofile = ({ user, setUser }) => {
    const [interest, setinterest] = useState([]);
    const dob = useRef(undefined);
    const emergency_contact = useRef(undefined);
    const location = useRef(undefined);
    const education = useRef(undefined);
    
    // const fb_link = useRef(undefined);
    const ig_link = useRef(undefined);
    const about = useRef(undefined);
    const occupation = useRef(undefined);
    var img_link = "";
    var gender = "";
    var sex_preference = "";
    var lat = "";
    var long = "";

    const handleGender = (e) => {
        gender = e.target.value;
    }

    const handlePreference = (e) => {
        sex_preference = e.target.value;
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
        } else {
            swal("Good job!", "Geolocation is not supported by this browser", "error");
        }
    }

    const getCoordinates = (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat, long);
    }

    const handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                swal("Good job!", "User denied the request for Geolocation.", "error");
                break;
            case error.POSITION_UNAVAILABLE:
                swal("Good job!", "Location information is unavailable.", "error");
                break;
            case error.TIMEOUT:
                swal("Good job!", "The request to get user location timed out.", "error");
                break;
            case error.UNKNOWN_ERROR:
                swal("Good job!", "An unknown error occurred.", "error");
                break;
            default: swal("Good job!", "An unknown error occurred.", "error");
        }
    }
    var validated = false;
    const validation = () => {
       
        if(dob.current.value === '')
            swal("Required", "Please provide your DOB", "warning");
        else if(gender === '')
            swal("Required", "Bhaisahab! Gender cannot be empty", "warning");
        else if(sex_preference === '')
            swal("Required", "Arey! Koi to preference hogi", "warning");
        else if(location.current.value === '')
        {
            if(gender === 'Male')
                swal("Required", "Arey dada! Provide your Location", "warning");
            else
                swal("Required", "Arey didi! Provide your Location", "warning");
        }
        else if(emergency_contact.current.value === '')
            swal("Required", "Provide Emergency Contact", "warning");
        else if(emergency_contact.current.value.length !== 10)
            swal("Invalid Number", "Provide Valid Emergengy Contact", "error");
        else
            validated=true;
        
        
    }

    const handleSubmit = async () => {
        validation();
        const files = document.getElementById('file').files;
        if (files[0] !== undefined) {
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'webster_images');
            //  setLoading(true);
            const res1 = await fetch("https://api.cloudinary.com/v1_1/cloudoj/image/upload", {
                method: 'POST',
                body: data
            })
            const file = await res1.json();
            console.log(file.url);
            img_link = file.url;
        }
        else {
            swal("Ugh Ohh!", "Please Upload Profile Picture", "error");
        }
        if (validated === true && img_link !== "") {
            const body = {
                _id: user.user._id,
                dob: dob.current.value,
                about: about.current.value,
                emergency_contact: emergency_contact.current.value,
                gender: gender,
                sexual_preference: sex_preference,
                location: location.current.value,
                education: education.current.value,
                occupation: occupation.current.value,
                interests: interest,
                fb_link: "",
                ig_link: ig_link.current.value,
                imagesurl: img_link,
                latitude: lat,
                longitude: long
            };
            const config = { headers: { "Content-Type": "application/json" } };
            API.post("/updateprofile", body, config)
                .then(response => {
                    //const id=response.data._id;
                    //API.get(`/users/${id}`,config)
                    //.then(res => {
                    setUser(response.data);
                    console.log("Profile Updated", response);
                    //})
                }).catch(() => {
                    swal("Sorry!", "Something went wrong from our side", "error");
                })
        }
        else {
            console.log('Image not uploaded Succesfully');
        }
    }
    let style = {
        margin: '1% 25%',
        padding: '0.5% 3%',
        width: '60%',
        boxShadow: '0 0 10px 10px rgb(253, 173, 247)'
    };
    const sendData = (e) => {
        API.get("/logout");
        setUser(null);
        
    };

    return (
        <>
            
                <img
                src="icons/log-out.png"
                height="6%"
                width="3%"
                style={{position: 'fixed', right: '1%', cursor: 'pointer'}}
                alt="Logout_Icon"
                onClick={(e) => sendData(e)}
                />
           
            <div className="buildprofile" style={style}>
                <Row>
                    <Col className="text-center"><h3 style={{ margin: '5%' }}>Tell us something more about you</h3></Col>
                </Row>
                <Stack direction="horizontal" gap={2}>
                    <Stack gap={4} style={{maxWidth: '50%'}}>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Interest</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <div style={{margin: '0', width: '80%', whiteSpace: 'nowrap', padding: '2%', overflowX: 'scroll'}}>
                                            <Tabs interest={interest}/>
                                        </div>
                                        </Col>
                                    </Row>
                                    <Row>{console.log(interest)}
                                        <Col><Interest interest={interest} setinterest={setinterest}/></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Date of Birth</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='date' max="2003-01-01" ref={dob} /></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col md={{ span: 3 }}><h6>Gender:</h6></Col>
                                    </Row>
                                    <Row> 
                                        <Col md={{ span: 1 }}><input type="radio" id="male" name="gender" onChange={handleGender} value="Male" /></Col>
                                        <Col md={{ span: 2 }}><label htmlFor="male">Male</label></Col>
                                        <Col md={{ span: 1 }}><input type="radio" id="female" name="gender" onChange={handleGender} value="Female" /></Col>
                                        <Col md={{ span: 2 }}><label htmlFor="female">Female</label></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col><h6>Sexual Preference:</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col md={{ span: 1 }}><input type="radio" id="male-pref" name="sex-pref" onChange={handlePreference} value="Male" /></Col>
                                        <Col md={{ span: 2 }}><label htmlFor="male-pref">Male</label></Col>
                                        <Col md={{ span: 1 }}><input type="radio" id="fem-pref" name="sex-pref" onChange={handlePreference} value="Female" /></Col>
                                        <Col md={{ span: 2 }}><label htmlFor="fem-pref">Female</label></Col>
                                        <Col md={{ span: 1 }}><input type="radio" id="both-pref" name="sex-pref" onChange={handlePreference} value="Both" /></Col>
                                        <Col md={{ span: 2 }}><label htmlFor="both-pref">Both</label></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Location</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={location} onChange={getLocation} /></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        
                        

                    </Stack>
                    <Stack gap={4}>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Highest Education</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <select ref={education} >
                                            <option value="NA">Don't Want to tell</option>
                                            <option value="PHD">PHD</option>
                                            <option value="Post Graduation">Post Graduation</option>
                                            <option value="Graduation">Graduation</option>
                                            <option value="12th Class">12th Class</option>
                                            <option value="10th Class">10th Class</option>
                                            <option value="10th Class">Uneducated</option>
                                        </select>
                                        </Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Occupation</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={occupation} /></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Instagram Username</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={ig_link} /></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Emergency Contact</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='number' ref={emergency_contact} /></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>About</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><textarea type="text" style={{ height: '140%', width: '70%', borderRadius: '10px' }} ref={about} placeholder="Describe Yourself" /></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                    </Stack>
                </Stack>
                <Row className="justify-content-md-center" style={{ margin: '2%' }}>
                    <Col xs md="3" className="text-center"><h5 style={{ margin: '8%' }}>Upload DP</h5></Col>
                    <Col xs md="4" className="text-center">
                        <div id="choose-file">
                            <label htmlFor="file"><i class="fas fa-plus"></i></label>
                            <input id="file" onChange={() => document.getElementById('cross').style.visibility = 'visible'} type='file' />
                            <span id="cross" onClick={() => {
                                document.getElementById('file').value = '';
                                document.getElementById('cross').style.visibility = 'hidden';
                            }}><i class="fas fa-times"></i></span>
                        
                        </div>
                    
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center"><Button variant="primary" size="lg" onClick={() => handleSubmit()} active>Let's Go</Button></Col>
                </Row>
            </div>
        </>
    )
};

const Tabs = ({interest}) => {
    const print = interest.map((item)=>{
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

export default Buildprofile;