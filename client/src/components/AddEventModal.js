import React, {useState, useRef} from "react";
import Popup from 'react-animated-popup';
import Datetime from 'react-datetime';
import "../styles/calender.css"
export default function({isOpen, onClose, onEventAdded, matchDetails}) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [dateId, setDateId] =useState("");
    const matchId = useRef("")
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("in on submit", title,dateId, start,end);
        onEventAdded({
            title,
            dateId,
            start,
            end
        })
        onClose();
    }

    const print = matchDetails.map((item)=>{
        return(
            <option value={item?._id}>{item?.name}</option>
        )
    })

    return (
        <Popup visible={isOpen} onClose={onClose}>
            <form class="schedule-date" onSubmit={onSubmit}>
                <h2>Schedule a Date</h2>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Choose Friend</label>
                    <select onChange={() => setDateId(matchId?.current?.value)} ref={matchId}>{print}</select>
                </div>
                
                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={date=> setStart(date)}/>
                </div>

                <div>
                    <label>End Date</label>
                    <Datetime value={end} onChange={date=> setEnd(date)}/>
                </div>
                <button>Schedule</button>
            </form>
        </Popup>
    )
}