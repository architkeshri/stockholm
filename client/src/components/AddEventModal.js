import React, {useState} from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';

export default function({isOpen, onClose, onEventAdded}) {
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [dateId, setDateId] =useState("");

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

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>

                <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}></input>

                <input placeholder="Date Name" value={dateId} onChange={e=>setDateId(e.target.value)}></input>

                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={date=> setStart(date)}/>
                </div>

                <div>
                    <label>End Date</label>
                    <Datetime value={end} onChange={date=> setEnd(date)}/>
                </div>
                <button>Add Date!</button>
            </form>
        </Modal>
    )
}