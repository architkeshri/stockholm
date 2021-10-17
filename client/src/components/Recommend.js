const Recommend = ({recommendations}) => {

    const print = recommendations.map((item)=>{
        return (
            <div className="recommend-card">
                <img src="../../icons/dummyprofile.png"/>
                <h4>{item.name}</h4>
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