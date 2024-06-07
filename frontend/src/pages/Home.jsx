import { useEffect, useState } from "react"
import api from "../api"
import '../styles/Home.css'
import Event from "../components/Notes"

function Home(){
    const [events,setEvents] = useState([])
    
    useEffect(()=>{
        getNote()
    },[])

    const getNote = async() => {
        await api.get("/operations/search/")
        .then((res) => res.data).
        then((data) =>{setEvents(data); console.log(data)})
        .catch((err) => alert(err))
    }

    const deleteNote = async(id) => {
        console.log(id)
        await api.delete(`/operations/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Note deleted")
            else alert("Fail to delete")
            getNote()
        }).catch((error) => alert(error))
        
    }



    return <div>
        <div className="event-container">
            <h2>Events</h2>
            {events.map((event) =><Event event={event} onDelete={deleteNote} key={event.uid}/>)}
        </div>
    </div>
}

export default Home