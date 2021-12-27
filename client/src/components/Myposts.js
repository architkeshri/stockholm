import { Card } from "react-bootstrap";
import { format } from "timeago.js";
import '../styles/card.css';
import API from "../utils/API";
import swal from "sweetalert";
const Myposts = ({id, feeds, setpostCount}) => {

    const deletePost = (id, userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                API.post(`/deletepost/${id}`, {userId: userId},{ headers: { "Content-Type": "application/json" }})
                .then((response)=>{
                    swal("Poof! Post has been deleted!", {
                        icon: "success",
                    });
                    console.log(response);
                })
                .catch((err)=>{
                    swal('Uhh Ohh!', 'Something Went Wrong', 'error')
                    console.log("Mypost: ", err);
                })
              
            } else {
              swal("Your post is safe!");
            }
          });
        
    }
    var count = 0;
    console.log("helo> ", feeds)
    const print = feeds?.map((item)=>{
       
        return (
        <>
            {
            (item?.userInfo?._id !== id) ? (<></>) :
            (<Card className= "cardi" style={{ width: '100%', margin: '3% 0', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
                <Card.Body>
                    {setpostCount(++count)}
                    <img 
                    src={item?.userInfo?.imagesurl} 
                    style={{ width: '12%', height: '60px', borderRadius: '50%', float: 'left', objectFit: 'cover'}} 
                    alt=""/>
                    
                    <Card.Title style={{display: 'inline-block', marginLeft: '2%'}}>
                    <div style={{display: 'flex'}}>
                        <h4>{item?.userInfo?.name}</h4>
                        <span style={{position: 'absolute', marginLeft: '75%'}}>
                            <img 
                            onClick={()=>deletePost(item._id, item.userId)}
                            style={{width: '20px'}}
                            src="https://img.icons8.com/material-sharp/50/000000/filled-trash.png"
                            />
                        </span>
                    </div>
                    <p className="mb-1 text-muted" style={{fontSize: '15px'}}>Posted: {format(item?.createdAt)}</p></Card.Title>
                    <Card.Text>{item?.desc}</Card.Text>
                </Card.Body>
                <Card.Img variant="top" style={{border: '2px solid #bebebe', borderRadius: '20px', margin: '2%', width: '96%', maxHeight: '600px'}} src={item?.imageurl} alt=""/>
            </Card>)
            }
        </>
        )
    })

    return (
        <>
        {(feeds.length === 0) ? (<img src="../../icons/Runningheart.gif" style={{marginLeft: '40%', marginTop: '20%'}} alt="Loading..."/>)
        : (print)
        }
        </>
       
    )
    
}

export default Myposts;