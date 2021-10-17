import { Stack, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";
import API from '../utils/API';
const Buildprofile = ({ user, setUser }) => {

    const dob = useRef(undefined);
    const emergency_contact = useRef(undefined);
    const location = useRef(undefined);
    const education = useRef(undefined);
    const interest = useRef(undefined);
    const fb_link = useRef(undefined);
    const ig_link = useRef(undefined);
    const about = useRef(undefined);
    const image_url = useRef(undefined);
    const occupation = useRef(undefined);
    var img_link = "";
    var gender = "";
    var sex_preference = "";
    var latitude="";
    var longitude="";

    const handleGender = (e) => {
        gender = e.target.value;
    }

    const handlePreference = (e) => {
        sex_preference = e.target.value;
    }

    const uploadImage = async e => {
        console.log("uploading image");
        const files = e.target.files;
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

    const getLocation= ()=> {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationError);
        } else {
            alert("Geolocation is not supported by this browser");
        }
    }

    const getCoordinates=(position) =>{
        latitude= position.coords.latitude;
        longitude= position.coords.longitude;
        console.log(latitude,longitude);
    }

    const handleLocationError=(error)=> {
        switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
            default: alert("An unknown error occurred.");
          }
    }


    const handleSubmit = () => {
        getLocation();
        const body = {
            _id: user._id,
            dob: dob.current.value,
            about: about.current.value,
            emergency_contact: emergency_contact.current.value,
            gender: gender,
            sexual_preference: sex_preference,
            location: location.current.value,
            education: education.current.value,
            occupation: occupation.current.value,
            interests: [],
            fb_link: fb_link.current.value,
            ig_link: ig_link.current.value,
            imagesurl: img_link
        };
        const config = { headers: { "Content-Type": "application/json" } };
        API.post("/updateprofile", body, config)
            .then(response => {
                setUser(response.data);
                console.log("Login success", response);
            }).catch(() => {
                alert("Invalid Credentials!!");
            })
        
    }
    let style = {
        margin: '1% 25%',
        padding: '3% 0.5%',
        width: '60%',
        boxShadow: '0 0 10px 10px rgb(253, 173, 247)'
    };
    return (
        <>
            <div className="buildprofile" style={style}>
                <Row>
                    <Col className="text-center"><h3 style={{ margin: '5%' }}>Tell us something more about you</h3></Col>
                </Row>
                <Stack direction="horizontal" gap={2}>
                    <Stack gap={4}>
                        
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Date of Birth</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='date' ref={dob}/></Col>
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
                                        <Col><input type='text' ref={location}/></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Highest Education</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={education}/></Col>
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
                                        <Col><input type='text' ref={occupation}/></Col>
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
                                        <Col ><h6>Interest</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={interest}/></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Link to Facebook</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={fb_link}/></Col>
                                    </Row>
                                </Stack>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Stack gap={3}>
                                    <Row>
                                        <Col ><h6>Link to Instagram</h6></Col>
                                    </Row>
                                    <Row>
                                        <Col><input type='text' ref={ig_link}/></Col>
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
                                        <Col><input type='number' ref={emergency_contact}/></Col>
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
                    <Col xs md="4" className="text-center"><input type="file" onChange={uploadImage} style={{ margin: '5%', backgroundColor: '#fff' }} ref={image_url} placeholder="Image" /></Col>
                </Row>
                <Row>
                    <Col className="text-center"><Button variant="primary" size="lg" onClick={() => handleSubmit()} active>Let's Go</Button></Col>
                </Row>
            </div>
        </>
    )
};

export default Buildprofile;