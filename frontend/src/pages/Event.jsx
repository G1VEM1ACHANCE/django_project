import React, { useState } from "react";
import Modify from "./Modify";
import Details from "./Details";
function EventDetail(){
    const [isModify,setisModify] = useState(false)
    function handleModify() {
        setisModify(!isModify)
    }
    return isModify? <Modify/>:<Details handleModify={handleModify}/>
}

export default EventDetail