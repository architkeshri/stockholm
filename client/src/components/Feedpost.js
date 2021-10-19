import { Card } from "react-bootstrap";
import { format } from "timeago.js";
import '../styles/card.css';
const Feedpost = ({feeds}) => {

    const print = feeds.map((item)=>{
        return (
            <Card className= "cardi" style={{ width: '35rem', margin: '1% auto', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle className="mb-1 text-muted">Posted: {format(item.createdAt)}</Card.Subtitle>
                    <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
                <Card.Img variant="top" style={{border: '2px solid #bebebe', borderRadius: '20px', margin: '2%', width: '96%', maxHeight: '600px'}} src={item.imageurl} />
            </Card>
        )
    })

    return (
        <>
        {(feeds.length === 0) ? (<img src="../../icons/loading.gif" style={{marginLeft: '15%', marginTop: '20%'}}/>)
        : (print)
        }
        </>
       
    )
    
}

export default Feedpost;