import { Card } from "react-bootstrap";
import test from './testdata.js'
const Feedpost = ({feeds}) => {

    const print = feeds.map((item)=>{
        return (
            <Card style={{ width: '35rem', margin: '1% auto', borderRadius: '20px' }}>
                <Card.Body>
                    <Card.Title>{item.userId}</Card.Title>
                    <Card.Subtitle className="mb-1 text-muted">Posted on: {item.createdAt}</Card.Subtitle>
                    <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
                <Card.Img variant="top" style={{border: '2px solid #bebebe', borderRadius: '20px', margin: '2%', width: '96%'}} src={item.imageurl} />
            </Card>
        )
    })

    return (
        <>
        {print}
        </>
       
    )
    
}

export default Feedpost;