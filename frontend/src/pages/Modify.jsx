import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Modify.css'
import api from "../api"
import { useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';

function Modify() {
    const location = useLocation()
    const navigate = useNavigate()
    const [eventdetail,setEventDetail] = useState(location.state.event)
    var [masterunit,setMasterUnit] = useState("")
    function formatDateWithoutSeconds(datetimeString) {
        const date = parseISO(datetimeString);
        return format(date, "yyyy-MM-dd'T'HH:mm");
      }
    
    const updateNote = async(id) => {
        eventdetail.masterunits.map((unit,index) => {
            if(unit.unit_name === "")
                eventdetail.masterunits.pop(index)
        })
        eventdetail.subunits.map((unit,index) => {
            if(unit.unit_name === "")
                eventdetail.subunits.pop(index)
        })
        eventdetail.supportunits.map((unit,index) => {
            if(unit.unit_name === "")
                eventdetail.supportunits.pop(index)
        })
        eventdetail.other_units.map((unit,index) => {
            if(unit.unit_name === "")
                eventdetail.other_units.pop(index)
        })
        await api.patch(`/operations/update/${id}/`,eventdetail)
        .then((res) => {
            if (res.status === 200) alert("Note updated")
            else alert("Fail to update")
            navigate('/')
        }).catch((error) => alert(error))
        
    }
    const handleUnit = (index, event) => {
        const field = event.target.name
        setEventDetail((prevState) => {
            const newSupport = [...prevState[field]];
            if (event.target.value === ""){
                newSupport.pop(index)
            } else{
                newSupport[index] = {
                    ...newSupport[index],
                    unit_name: event.target.value
                };
            }
            return { ...prevState, [field]: newSupport };
        });
      };
      const addUnit = (e) => {
        const field = e.target.name
        
            setEventDetail((prevState) => {
                console.log(field,prevState[field])
                const newSupport = [...prevState[field]];
                newSupport.push({unit_name:"",event:eventdetail.uid})
                return { ...prevState, [field]: newSupport };
        });
      }
     

    const handle_show_info = (e) => {
        const index = e.target.dataset.index;
        const field = e.target.name;
        const value = e.target.value;

        setEventDetail((prevState) => {
            const newShowInfo = [...prevState.show_info];
            newShowInfo[index] = {
                ...newShowInfo[index],
                [field]: value
            };
            return { ...prevState, show_info: newShowInfo };
        });
    };
    return(
        <div className="info-container">
            活動資訊
    <table>
        <tr>
            <th>資料欄位</th>
            <th>內容</th>
        </tr>
        <tr>
            <td>活動名稱</td>
            <td><input type="text" value={eventdetail.title} onChange={(e) => setEventDetail({ ...eventdetail, title: e.target.value })}
/></td>
        </tr>
        <tr>
            <td>活動種類</td>
            <td><input type="number" value={eventdetail.category} onChange={(e) => setEventDetail({ ...eventdetail, category: e.target.value})}/></td>
        </tr>
        <tr>
            <td>活動單位</td>
            <td><input type="text" value={eventdetail.show_unit} onChange={(e) => setEventDetail({ ...eventdetail, show_unit: e.target.value})}/></td>
        </tr>
        <tr>
            <td>活動介紹</td>
            <td><textarea type="text" value={eventdetail.descriptionFilterHtml} onChange={(e) => setEventDetail({ ...eventdetail, descriptionFilterHtml: e.target.value})}/></td>
        </tr>
        <tr>
            <td>折扣資訊</td>
            <td><input type="text" value={eventdetail.discount_info} onChange={(e) => setEventDetail({ ...eventdetail, discount_info: e.target.value})}/></td>
        </tr>
        <tr>
            <td>圖片連結</td>
            <td><input type="text" value={eventdetail.imageUrl} onChange={(e) => setEventDetail({ ...eventdetail, imageUrl: e.target.value})}/></td>
        </tr>
        <tr>
            <td>售票網址</td>
            <td><input type="text" value={eventdetail.web_sales} onChange={(e) => setEventDetail({ ...eventdetail, web_sales: e.target.value})}/></td>
        </tr>
        <tr>
            <td>推廣網址</td>
            <td><input type="text" value={eventdetail.source_web_promote} onChange={(e) => setEventDetail({ ...eventdetail, source_web_promote: e.target.value})}/></td>
        </tr>
        <tr>
            <td>備註</td>
            <td><textarea type="text" value={eventdetail.comment} onChange={(e) => setEventDetail({ ...eventdetail, comment: e.target.value})}/></td>
        </tr>
        <tr>
            <td>來源網站名稱</td>
            <td><input type="text" value={eventdetail.source_web_name} onChange={(e) => setEventDetail({ ...eventdetail, source_web_name: e.target.value})}/></td>
        </tr>
        <tr>
            <td>活動起始日期</td>
            <td><input type="date" value={eventdetail.start_date} onChange={(e) => setEventDetail({ ...eventdetail, start_date: e.target.value})}/></td>
        </tr>
        <tr>
            <td>活動結束日期</td>
            <td><input type="date" value={eventdetail.end_date} onChange={(e) => setEventDetail({ ...eventdetail, end_date: e.target.value})}/></td>
        </tr>
        <tr>
            <td>點閱數</td>
            <td><input type="number" value={eventdetail.hit_rate} onChange={(e) => setEventDetail({ ...eventdetail, hit_rate: e.target.value})}/></td>
        </tr>
        <tr>
                <td>主辦單位</td>
                <td>
                {
               eventdetail.masterunits.map((unit,index) => {
                return <input className="units"
                type="text"
                name="masterunits"
                style={{width:"50px"}}
                value={unit.unit_name}
                onChange={(event) => handleUnit(index, event)}
              />
               })
            }
            <button name="masterunits" onClick={addUnit}>增加</button>
            </td>
        </tr>
        <tr>
                <td>協辦單位</td>
                <td>
            {
               eventdetail.subunits.map((unit,index) => {
                return <input className="units"
                type="text"
                name="subunits"
                style={{width:"50px"}}
                value={unit.unit_name}
                onChange={(event) => handleUnit(index, event)}
              />
               })
            }
            <button name="subunits" onClick={addUnit}>增加</button>
            </td>
        </tr>
        <tr>
                <td>贊助單位</td>
                <td>
            {
               eventdetail.supportunits.map((unit,index) => {
                return <input className="units"
                type="text"
                name="supportunits"
                style={{width:"50px"}}
                value={unit.unit_name}
                onChange={(event) => handleUnit(index, event)}
              />
               })
            }
            <button name="supportunits" onClick={addUnit}>增加</button>
            
            </td>
        </tr>
        <tr>
                <td>其他單位</td>
                <td>
                {
               eventdetail.other_units.map((unit,index) => {
                return <input className="units"
                type="text"
                name="other_units"
                style={{width:"50px"}}
                value={unit.unit_name}
                onChange={(event) => handleUnit(index, event)}
              />
               })
            }
            <button name="other_units" onClick={addUnit}>增加</button>
            </td>
        </tr>
    </table>
    <h2>場次資訊</h2>
    {
        eventdetail.show_info.map((info,index)=>{
            return(
                <table key={index}>
                            <tr>
                                <td>單場次演出時間</td>
                                <td><input type="datetime-local" data-index={index} name="time" value={formatDateWithoutSeconds(info.time)} onChange={handle_show_info} /></td>
                            </tr>
                            <tr>
                                <td>是否售票</td>
                                <td>
                                    <select data-index={index} name="on_sales" value={info.on_sales} onChange={handle_show_info}>
                                        <option value="true">Y</option>
                                        <option value="false">N</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>地址</td>
                                <td><input type="text" data-index={index} name="location" value={info.location} onChange={handle_show_info} /></td>
                            </tr>
                            <tr>
                                <td>場地名稱</td>
                                <td><input type="text" data-index={index} name="location_name" value={info.location_name} onChange={handle_show_info} /></td>
                            </tr>
                            <tr>
                                <td>緯度</td>
                                <td><input type="number" step="0.0001" data-index={index} name="latitude" value={info.latitude} onChange={handle_show_info} /></td>
                            </tr>
                            <tr>
                                <td>經度</td>
                                <td><input type="number" step="0.0001" data-index={index} name="longtitude" value={info.longtitude} onChange={handle_show_info} /></td>
                            </tr>
                            <tr>
                                <td>售票說明</td>
                                <td><input type="text" data-index={index} name="price" value={info.price} onChange={handle_show_info} /></td>
                            </tr>
                            <tr>
                                <td>結束時間</td>
                                <td><input type="datetime-local" data-index={index} name="end_time" value={formatDateWithoutSeconds(info.end_time)} onChange={handle_show_info} /></td>
                            </tr>
                        </table>
            )
        })
    }
    <button className="modify-button" onClick={() => updateNote(eventdetail.uid)}>
    確定
</button> 
</div>)
}
export default Modify;