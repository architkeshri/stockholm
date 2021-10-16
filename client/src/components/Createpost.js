import { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import '../styles/card.css';
import API from '../utils/API';
const Createpost = ({user}) => {
    const [img_link, setimg_link] = useState("");
    const description = useRef("");
   
    
    const handlePost = async () => {
        
        const files = document.getElementById('file').files;
        if(files[0] !== undefined){
            console.log("uploading image...");
            const data = new FormData();
            data.append('file',files[0]);
            data.append('upload_preset','webster_images');
            const res1 = await fetch("https://api.cloudinary.com/v1_1/cloudoj/image/upload", {
                method: 'POST',
                body: data
            })
            const file = await res1.json();
            setimg_link(file.url);
            document.getElementById('file').value = null;
        }
        else{
            alert('No file Choosen');
        }
        
    }
   /*Error occuring here*/
    useEffect(() => {
        if(img_link !== ""){
            const body = {
                userId: user.user._id,
                imageurl: img_link,
                desc: description
            }
            const config = {headers: {"Content-Type": "application/json"}};
            API.post("/addpost",body,config)
            .then(response => {
            console.log("data: ", response);
            }).catch(() => {
            alert("Error Occured while posting feed!!");
            })
            console.log(img_link);
            setimg_link("");
        }
        
    }, [img_link]);

    return (
        <Card className= "createpost" style={{ width: '35rem', margin: '1% auto', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
            <Card.Body>
                <Card.Title>Create Post</Card.Title>
                {/* <Card.Subtitle className="mb-1 text-muted">Posted on: {item.createdAt}</Card.Subtitle> */}
                <textarea id="description" style={{width: '100%'}} placeHolder="Write Something Here..." ref={description}/>
                <input id="file" type='file'/>
                <button type="submit" onClick={handlePost}>Post</button>
            </Card.Body>
            {/* <Card.Img variant="top" style={{border: '2px solid #bebebe', borderRadius: '20px', margin: '2%', width: '96%'}} src={item.imageurl} /> */}
        </Card>
    );
    
}

export default Createpost;