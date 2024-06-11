import { useEffect, useState } from "react"
import api from "../api"
import '../styles/Home.css'
import Event from "../components/Notes"
import Create from "./Create"
import { useNavigate } from "react-router-dom"

function Home(){
    const [events,setEvents] = useState([])
    const [searchTitle,setSearchTitle] = useState("")
    const [isSearch,setIsSearch] = useState(false)
    const navigate = useNavigate()
    
    useEffect(()=>{
        getNote()
    },[])

    const getNote = async() => {
        await api.get("/operation/")
        .then((res) => res.data).
        then((data) =>{setEvents(data);})
        .catch((err) => alert(err))
    }

    const deleteNote = async(id) => {
        await api.delete(`/operation/`,{uid:id})
        .then((res) => {
            if (res.status === 204) alert("Event deleted")
            else alert("Fail to delete")
            getNote()
        }).catch((error) => alert(error))
        
    }



    return  <div style={{
        display: 'grid',
        flexWrap: 'wrap',
        width: '100%',
        padding: '10px',
      }}>
        <button type="button" style={{position:"fixed",top:"10px",right:"120px",backgroundColor:"#3d7cc5"}}onClick={()=>{navigate('/login')}}>Login</button>
        <button type="button" style={{position:"fixed",top:"10px",right:"10px",backgroundColor:"#3d7cc5"}}onClick={()=>{navigate('/logout')}}>Logout</button>
        <div>
        <h2>Events</h2>
        </div>
        <div>
        
        
        
        {isSearch === true?<div><input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/></div>:<></>}
        <button onClick={() => setIsSearch(true)}>搜尋</button>
        <button onClick={()=>{navigate('/create')}}>新增活動</button>
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