const Recommend = ({recommendations}) => {

    const print = recommendations.map((item)=>{
        return (
            <div className="recommend-card">
                <img src="../../icons/dummyprofile.png"/>
                <h4>{item.name}</h4>
                <span><i class="fas fa-heart fa-lg"></i></span>
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