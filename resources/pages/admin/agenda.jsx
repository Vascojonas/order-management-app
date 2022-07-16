import React from 'react'
import {Link,NavLink, useOutletContext } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function agenda() {

  const [encomendas,setEncomendas]= useOutletContext();


  const agendaEncomendas =()=>{

    let result = new Array();
    let title;
    let  date; 

    encomendas.map((item)=>{
        if(item.status==1||item.status==2){
            title = item.nome +" "+item.apelido
            date = (item.prazo.split(" "))[0];

            let data ={
                title:title,
                date:date
            }
            result.push(data);
        }
    })
    return result;
}


const agenda = agendaEncomendas();

  console.log()
  return (

    <div className="container mt-3" style={{height:"460px"}}>

        <FullCalendar
            plugins={[ dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={agenda}
        />
    </div>
  )
}

export default agenda
