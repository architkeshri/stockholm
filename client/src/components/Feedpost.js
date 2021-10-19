import { Card } from "react-bootstrap";
import '../styles/card.css';
const Feedpost = ({feeds}) => {

    const print = feeds.map((item)=>{
        return (
            <Card className= "cardi" style={{ width: '100%', margin: '3% 2%', borderRadius: '20px', transitionDuration: '0.5s', cursor: 'pointer' }}>
                <Card.Body>
                    <Card.Title><img src={item.imageurl} style={{ width: '10%', height: '60%', borderRadius: '50%' }} alt=""/><h4 style={{display: 'inline', margin: '1% 1.5%'}}>{item.name}</h4></Card.Title>
                    <Card.Subtitle className="mb-1 text-muted">Posted on: {item.createdAt}</Card.Subtitle>
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