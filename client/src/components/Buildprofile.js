import { Container, Stack, Row, Col, Button } from "react-bootstrap";
import { useRef } from "react";
import API from '../utils/API';
const Buildprofile = ({user, setUser}) => {

    const dob = useRef(undefined);
    const emergency_contact = useRef(undefined);
    const gender = useRef(undefined);
    const sexual_preference = useRef(undefined);
    const location = useRef(undefined);
    const education = useRef(undefined);
    const interest = useRef(undefined);
    const fb_link = useRef(undefined);
    const ig_link = useRef(undefined);
    const about = useRef(undefined);
    const image_url = useRef(undefined);
    const occupation = useRef(undefined);
    const handleSubmit = () => {
        
        const body = {
            _id: user.user._id,
            dob: dob.current.value,
            about: about.current.value,
            emergency_contact: emergency_contact.current.value,
            gender: gender.current.value,
            sexual_preference: sexual_preference.current.value,
            location: location.current.value,
            education: education.current.value,
            occupation: occupation.current.value,
            interests: [],
            fb_link: fb_link.current.value,
            ig_link: ig_link.current.value,
            image_url: null
        };
      const config = {headers: {"Content-Type": "application/json"}};
      API.post("/updateprofile",body,config)
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
        width: '50%',
        boxShadow: '0 0 10px 10px rgb(253, 173, 247)'
    };
    return(
        <>
        <Container className="buildprofile" style={style}> 
            <Row>
                <Col className="text-center"><h3 style={{margin: '5%'}}>Tell us something more about you</h3></Col>
            </Row>
            <Stack direction="horizontal" gap={2}>
                <Stack gap={4}>
                    <Row>
                        <Col className="text-center"><input type="date" ref={dob} placeholder="D.O.B" /></Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs md="7">
                            <Row>
                                <Col>Male</Col>
                                <Col><input type="radio" name="gender" ref={gender} value="Male"/></Col>
                                <Col>Female</Col>
                                <Col><input type="radio" name="gender" ref={gender} value="Female"/></Col>
                            </Row>  
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={sexual_preference} placeholder="Sexual Preferences" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={location} placeholder="Location" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={education} placeholder="Education" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={occupation} placeholder="Occupation" /></Col>
                    </Row>
                </Stack>
                <Stack gap={4}>
                    <Row>
                        <Col className="text-center"><input type="text" ref={interest} placeholder="Interest" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={fb_link} placeholder="Link to Facebook" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={ig_link} placeholder="Link to Instagram" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><input type="text" ref={emergency_contact} placeholder="Emergency Contact" /></Col>
                    </Row>
                    <Row>
                        <Col className="text-center"><textarea type="text" style={{height: '140%', width: '70%', borderRadius: '10px'}} ref={about} placeholder="Describe Yourself" /></Col>
                    </Row>
                </Stack>
            </Stack>
            <Row className="justify-content-md-center" style={{margin: '2%'}}>
                <Col xs md="3" className="text-center"><h5 style={{margin: '8%'}}>Upload DP</h5></Col>
                <Col xs md="4" className="text-center"><input type="file" style={{margin: '5%', backgroundColor: '#fff'}} ref={image_url} placeholder="Image" /></Col>
            </Row>
            <Row>
                <Col className="text-center"><Button variant="primary" size="lg" onClick={() => handleSubmit()} active>Let's Go</Button></Col>
            </Row>
        </Container>
        </>
    )
};

export default Buildprofile;