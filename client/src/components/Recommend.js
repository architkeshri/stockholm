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
            <div className="recommend-card">
                <img src={item.imagesurl} alt=""/>
                <h4>{item.name}</h4>
                <span onClick={()=>handleLike(item._id)}><i class="fas fa-heart fa-lg"></i></span>
            </div>
        )
    })

    return(
        <>
            {print}
        </>
    )
}

export default Recommend;