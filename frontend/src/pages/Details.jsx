import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Detail.css'
import api from "../api"
import { useNavigate } from "react-router-dom";

function Details({handleModify}) {
    const location = useLocation()
    const navigate = useNavigate()
    const [eventdetail,setEventDetail] = useState(location.state.event)
    const deleteNote = async(id) => {
        await api.delete(`/operation/`,{data:{uid:id}})
        .then((res) => {
            if (res.status === 204) alert("Event deleted")
            else alert("Fail to delete")
            navigate('/')
        }).catch((error) => alert(error))
        
    }
    return(
        <div>
            <h1>活動資訊</h1>
    <table>
        <tr>
            <th>資料欄位</th>
            <th>內容</th>
        </tr>
        <tr>
            <td>活動名稱</td>
            <td>{eventdetail.title}</td>
        </tr>
        <tr>
            <td>活動種類</td>
            <td>{eventdetail.category}</td>
        </tr>
        <tr>
            <td>活動單位</td>
            <td>{eventdetail.show_unit}</td>
        </tr>
        <tr>
            <td>活動介紹</td>
            <td>{eventdetail.descriptionFilterHtml}</td>
        </tr>
        <tr>
            <td>折扣資訊</td>
            <td>{eventdetail.discount_info}</td>
        </tr>
        <tr>
            <td>圖片連結</td>
            <td><a href="url">{eventdetail.imageUrl}</a></td>
        </tr>
        <tr>
            <td>售票網址</td>
            <td><a href="url">{eventdetail.web_sales}</a></td>
        </tr>
        <tr>
            <td>推廣網址</td>
            <td><a href="url">{eventdetail.source_web_promote}</a></td>
        </tr>
        <tr>
            <td>備註</td>
            <td>{eventdetail.comment}</td>
        </tr>
        <tr>
            <td>來源網站名稱</td>
            <td>{eventdetail.source_web_name}</td>
        </tr>
        <tr>
            <td>活動起始日期</td>
            <td>{eventdetail.start_date}</td>
        </tr>
        <tr>
            <td>活動結束日期</td>
            <td>{eventdetail.end_date}</td>
        </tr>
        <tr>
            <td>點閱數</td>
            <td>{eventdetail.hit_rate}</td>
        </tr>
        <tr>
                <td>主辦單位</td>
                <td>
            {
               eventdetail.masterunits.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </td>
        </tr>
        <tr>
                <td>協辦單位</td>
                <td>
            {
               eventdetail.subunits.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </td>
        </tr>
        <tr>
                <td>贊助單位</td>
                <td>
            {
               eventdetail.supportunits.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </td>
        </tr>
        <tr>
                <td>其他單位</td>
                <td>
            {
               eventdetail.other_units.map((unit) => {
                return <span> {unit.unit_name}</span>
               })
            }
            </td>
        </tr>
        
    </table>
    <h2>場次資訊</h2>
    {
        eventdetail.show_info.map((info)=>{
            return(
                <table>
                    <tr>
                        <td>單場次演出時間</td>
                        <td>{info.time}</td>
                    </tr>
                    <tr>
                        <td>是否售票</td>
                        <td>{info.on_sales}</td>
                    </tr>
                    <tr>
                        <td>地址</td>
                        <td>{info.location}</td>
                    </tr>
                    <tr>
                        <td>場地名矇</td>
                        <td>{info.location_name}</td>
                    </tr>
                    <tr>
                        <td>緯度</td>
                        <td>{info.latitude}</td>
                    </tr>
                    <tr>
                        <td>經度</td>
                        <td>{info.longitude}</td>
                    </tr>
                    <tr>
                        <td>售票說明</td>
                        <td>{info.price}</td>
                    </tr>
                    <tr>
                        <td>結束時間</td>
                        <td>{info.end_time}</td>
                    </tr>
                    
                </table>
            )
        })
    }
    <button className="modify-button" onClick={handleModify}>修改</button>
    <button className="delete-button" onClick={() => deleteNote(eventdetail.uid)}>
    刪除
</button> 
</div>)
}
export default Details;