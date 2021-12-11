import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';
import API from '../utils/API';
import "../styles/recommend.css";

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
        var dateString= item.dob;
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return (
            <Carousel.Item>
            <div className="card1">
                <img src={item.imagesurl}/>
                <div className="info">
                <h1>{item.name}<span id="age"> ,{age}</span></h1>
                <p>{item.about}</p>
                <button id="btn-heart"><span onClick={()=>handleLike(item._id)}><i class="fas fa-heart fa-3x"></i></span></button>
                <button id="btn-bolt" ><span><i class="fa fa-bolt fa-3x" aria-hidden="true"></i></span></button>
                </div>
            </div>
            </Carousel.Item>
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

{/*<Carousel.Item className="recommend-card">
                <img
                    className="d-block w-100"
                    src={item.imagesurl}
                    alt="Image One"
                />
                <Carousel.Caption>
                    <h4>{item.name}</h4>
                    <span onClick={()=>handleLike(item._id)}><i class="fas fa-heart fa-3x"></i></span>
                </Carousel.Caption>
            </Carousel.Item>*/}
