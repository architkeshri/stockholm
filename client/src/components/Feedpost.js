import { Card } from "react-bootstrap";
import { format } from "timeago.js";
import '../styles/card.css';
const Feedpost = ({feeds}) => {

    const print = feeds.map((item)=>{
        return (
            <Card className= "cardi" style={{ width: '100%', margin: '3% 0', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
                <Card.Body>
                    <img src={item.imageurl} style={{ width: '12%', height: '60px', borderRadius: '50%', float: 'left', objectFit: 'cover'}} alt=""/>
                    <Card.Title style={{display: 'inline-block', marginLeft: '2%'}}><h4>{item.name}</h4>
                    <p className="mb-1 text-muted" style={{fontSize: '15px'}}>Posted: {format(item.createdAt)}</p></Card.Title>
                    <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
                <Card.Img variant="top" style={{border: '2px solid #bebebe', borderRadius: '20px', margin: '2%', width: '96%', maxHeight: '600px'}} src={item.imageurl} alt=""/>
            </Card>
        )
    })

    return (
        <>
        {(feeds.length === 0) ? (<img src="../../icons/loading.gif" style={{marginLeft: '15%', marginTop: '20%'}} alt="Loading..."/>)
        : (print)
        }
        </>
       
    )
    
}

export default Feedpost;