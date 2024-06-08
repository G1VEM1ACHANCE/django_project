import React from "react";
import '../styles/Note.css'
import { useNavigate } from 'react-router-dom';


function Event({event}){
    const navigate = useNavigate()
    const handleOnClick = (event) => {
        navigate(`/event/${event.uid}`, {
            state: { event: event}
          });
    }
    return( 
    <div style={{width: "400px",height:"200px",overflow:"hidden"}} className="note-container" onClick={()=>handleOnClick(event)}>
        <p className="note-title">{event.title}</p>
        <p className="note-content">{event.show_unit}</p>
        <p className="note-content">{event.source_web_name}</p>
        <a href="url">{event.source_web_promote}</a>
        <p>
            {event.masterunits.length > 0 &&(
                <span className="unit-content">主辦單位: 
            {
               event.masterunits.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </span>)
            }
            {event.subunits.length > 0 &&(
                <span className="unit-content">協辦單位: 
            {
               event.subunits.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </span>)
            }
            {event.supportunits.length > 0 &&(
                <span className="unit-content"> 贊助單位: 
            {
               event.supportunits.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </span>)
            }
            {event.other_units.length > 0 &&(
                <span className="unit-content">其他單位: 
            {
               event.other_units.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </span>)
            }
        </p>
    </div>
    )
}
export default Event