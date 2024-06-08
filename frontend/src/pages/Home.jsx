import { useEffect, useState } from "react"
import api from "../api"
import '../styles/Home.css'
import Event from "../components/Notes"

function Home(){
    const [events,setEvents] = useState([])
    const [searchTitle,setSearchTitle] = useState("")
    const [isSearch,setIsSearch] = useState(false)
    
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



    return <div style={{
        display: 'grid',
        flexWrap: 'wrap',
        width: '100%',
        padding: '10px',
      }}>
        <div>
        <h2>Events</h2>
        </div>
        <div>
        
        <button onClick={() => setIsSearch(true)}>搜尋</button>
        {isSearch === true?<input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>:<></>}
        </div>
        <div className="event-container">
            {events.map((event) =>{
                if (isSearch === true){
                    if (event.title.includes(searchTitle))
                        return <Event event={event} onDelete={deleteNote} key={event.uid}/>
                }
                else
                    return <Event event={event} onDelete={deleteNote} key={event.uid}/>
            })}
        </div>
    </div>
}

export default Home