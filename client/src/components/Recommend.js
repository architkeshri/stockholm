import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import API from '../utils/API';
const Recommend = ({recommendations, user}) => {

    const handleLike = (ID) => {
        const body= {
            userId: user.user._id
        }
        const config = { headers: { "Content-Type": "application/json" } };
        console.log(body, ID);
        API.put(`/${ID}/like`,body,config)
        .then(response => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    }
    const print = recommendations.map((item)=>{
        return (
       
            <Carousel.Item className="recommend-card">
                <img
                    className="d-block w-100"
                    src={item.imagesurl}
                    alt="Image One"
                />
                <Carousel.Caption>
                    <h4>{item.name}</h4>
                    <span onClick={()=>handleLike(item._id)}><i class="fas fa-heart fa-3x"></i></span>
                </Carousel.Caption>
            </Carousel.Item>
           
         
            // <div className="recommend-card">
            //     <img src={item.imagesurl} alt=""/>
            //     <h4>{item.name}</h4>
            //onClick={()=>handleLike(item._id)}
            //     <span><i class="fas fa-heart fa-lg"></i></span>
            // </div>
        )
    })

    return(
        <>
        <Carousel style={{borderRadius: '50px'}}>
            {print}
        </Carousel>
            
        </>
    )
}

export default Recommend;