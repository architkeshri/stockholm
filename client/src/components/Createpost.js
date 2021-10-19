import { useRef, useContext } from "react";
import { Card } from "react-bootstrap";
import '../styles/card.css';
import API from '../utils/API';
import swal from "sweetalert";

const Createpost = ({ user, callFeed }) => {

    const description = useRef(undefined);
    var img_link = "";
    // uploading pic on cloudinary and final data to database
    const handlePost = async () => {

        const files = document.getElementById('file').files;
        if (files[0] !== undefined) {
            console.log("uploading image...");
            const data = new FormData();
            data.append('file', files[0]);
            data.append('upload_preset', 'webster_images');
            const res1 = await fetch("https://api.cloudinary.com/v1_1/cloudoj/image/upload", {
                method: 'POST',
                body: data
            })
            const file = await res1.json();
            img_link = file.url;
        }
        else {
            swal('Required', 'Please Upload Photo', 'warning')
        }
        if (img_link !== "") {
            const body = {
                userId: user.user._id,
                name: user.user.name,
                imageurl: img_link,
                desc: description.current.value
            }
            const config = { headers: { "Content-Type": "application/json" } };
            console.log(body);
            API.post("/addpost", body, config)
                .then(response => {
                    console.log("data: ", response.data);
                }).catch((err) => {
                    console.log(err)
                   swal('Uhh Ohh!', 'Something Went Wrong', 'error')
                })
            console.log(img_link);
            document.getElementById('file').value = '';
            document.getElementById('description').value = '';
            document.getElementById('cross').style.visibility = 'hidden';
            callFeed();
        }

    }
 
    return (
        <Card className="createpost" style={{ width: '100%', margin: '1% 2%', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
            <Card.Body>
                <Card.Title>Create Post</Card.Title>
                {/* <Card.Subtitle className="mb-1 text-muted">Posted on: {item.createdAt}</Card.Subtitle> */}
                <textarea id="description" style={{ width: '100%' }} placeHolder="Write Something Here..." ref={description} />
                <div id="choose-file">
                    <label htmlFor="file"><i class="fas fa-plus"></i></label>
                    <input id="file" onChange={() => document.getElementById('cross').style.visibility = 'visible'} type='file' />
                    <span id="cross" onClick={() => {
                        document.getElementById('file').value = '';
                        document.getElementById('cross').style.visibility = 'hidden';
                    }}><i class="fas fa-times"></i></span>
                    <button id="submit" style={{ marginLeft: '40%', height: '80%' }} onClick={handlePost}>Post</button>
                </div>

            </Card.Body>

        </Card>
    );

}

export default Createpost;