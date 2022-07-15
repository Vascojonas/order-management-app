import React from 'react'
import {Link,NavLink, useOutletContext } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function agenda() {

  const agenda= useOutletContext();

  console.log(agenda)
  return (

    <div className="container mt-3" style={{height:"460px"}}>

        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            weekends={true}
            events={agenda}
        />
    </div>
  )
}

export default agenda
