import React, { useState } from "react";
import Modify from "./Modify";
import Details from "./Details";
import ProtectedRoute from "../components/ProtectedRoute";
function EventDetail(){
    const [isModify,setisModify] = useState(false)
    function handleModify() {
        setisModify(!isModify)
    }
    return isModify? <ProtectedRoute><Modify/></ProtectedRoute>:<Details handleModify={handleModify}/>
}

export default EventDetail