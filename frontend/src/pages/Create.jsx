import React, { useState,useEffect, version } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Modify.css'
import api from "../api"
import { useNavigate } from "react-router-dom";
import { format, parseISO } from 'date-fns';

function Create() {

    const navigate = useNavigate()
    const [eventdetail,setEventDetail] = useState({category:"",comment:"",descriptionFilterHtml:"",discount_info:"",end_date:"",hit_rate:"",imageUrl:"",show_unit:"",source_web_name:"",source_web_promote:"",start_date:"",title:"",web_sales:"",show_info:[],masterunits:[],subunits:[],supportunits:[],other_units:[],version:"1"})

    
    const updateNote = async(id) => {
        
        await api.post(`/operation/`,eventdetail)
        .then((res) => {
            if (res.status === 201) alert("created")
            else alert("Fail to create")
        }).catch((error) => console.log(error))
        navigate('/')
        console.log(eventdetail)
    }
     
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
      </table>
      <button onClick={updateNote}>創建</button>
</div>)
}
export default Create;