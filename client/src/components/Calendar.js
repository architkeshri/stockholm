import React, {useState, useRef} from "react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import AddEventModal from "./AddEventModal";
import API from '../utils/API';
import moment from "moment";


export default function({user}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    async function onEventAdded (event) {
        //console.log("sob",event);
        let calendarApi =  calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
        });
        const body = {
            creator: user.user._id,
            start: event.start,
            end: event.end,
            title: event.title,
            attendee: event.dateId
        }
        const config = { headers: { "Content-Type": "application/json" } };
        await API.post("/calendar/create-event", body, config)
            .then(response => {
                console.log("data: ", response.data);
            }).catch((err) => {
                console.log(err)
            })
    }

    /*async function handleEventAdd(data) {
        console.log("cryyy", data.event.start, data.event.end, data.event.title, data.event.dateId);
        //await API.post("/calendar/create-event", data.event);
    }*/

    async function handleDateSet(data){
        const response = await API.get(`/calendar/get-events/${user.user._id}`); 
        setEvents(response.data);
        console.log("Dates:", response.data);
    }

    return (
        <section>
            <button onClick={()=> setModalOpen(true)}>Plan a Date!</button>

            <div style={{position: "relative", zIndex: 0}}>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    //eventAdd={event=>handleEventAdd(event)}
                    datesSet={(date)=>handleDateSet(date)}
                />
            </div>
            
 
            <AddEventModal 
            isOpen={modalOpen} 
            onClose={()=> setModalOpen(false)} 
            onEventAdded={(event)=>onEventAdded(event)}>

            </AddEventModal>
        </section>
    )
}