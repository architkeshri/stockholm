import { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import '../styles/card.css';
import API from '../utils/API';
const Createpost = ({user, callFeed}) => {
   
    const description = useRef(undefined);
    var img_link="";
   
    // uploading pic on cloudinary and final data to database
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
            //setimg_link(file.url);
            img_link=file.url;
            //document.getElementById('file').value = null;
        }
        else{
            alert('No file Choosen');
        }
        if(img_link !== ""){
            const body = {
                userId: user.user._id,
                name: user.user.name,
                imageurl: img_link,
                desc: description.current.value
            }
            const config = {headers: {"Content-Type": "application/json"}};
            console.log(body);
            API.post("/addpost",body,config)
            .then(response => {
            console.log("data: ", response.data);
            }).catch((err) => {
                console.log(err)
            alert("Error Occured while posting feed!!");
            })
            console.log(img_link);
            document.getElementById('file').value = '';
            document.getElementById('description').value = '';
            callFeed();
        }
        else{
            console.log('Image not uploaded Succesfully');
        }
        
    }
  
    return (
        <Card className= "createpost" style={{ width: '35rem', margin: '1% auto', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
            <Card.Body>
                <Card.Title>Create Post</Card.Title>
                {/* <Card.Subtitle className="mb-1 text-muted">Posted on: {item.createdAt}</Card.Subtitle> */}
                <textarea id="description" style={{width: '100%'}} placeHolder="Write Something Here..." ref={description}/>
                <input id="file" style={{marginLeft: '5%'}} type='file'/>
                <button id="submit" style={{marginLeft: '20%'}} onClick={handlePost}>Post</button>
            </Card.Body>
            {/* <Card.Img variant="top" style={{border: '2px solid #bebebe', borderRadius: '20px', margin: '2%', width: '96%'}} src={item.imageurl} /> */}
        </Card>
    );
    
}

export default Createpost;