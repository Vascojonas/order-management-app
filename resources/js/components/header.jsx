import React from 'react'

import {TbMessageCircle} from 'react-icons/tb'
import {IoIosNotifications} from 'react-icons/io';
import {IoCalendar,IoSearch} from 'react-icons/io5';

function Header({pendentes, hoje}) {

  console.log(pendentes);
  return (
    <header>
        <div className="row bg-principal cabecalho">

           <div className='ml-auto '>
              <div className=' box '>
                <span className='number-box'>{pendentes}</span>
                <a className='btn-icon'> <IoIosNotifications size={25}/> </a>
              </div>
              {/*<div className=' box '>
                <span className='number-box'>5</span>
                <a className='btn-icon'> <TbMessageCircle size={25}/> </a>
              </div>*/}
              <div className=' box mr-5'>
                <span className='number-box'>{hoje}</span>
                <a className='btn-icon'> <IoCalendar size={25}/> </a>
              </div>
             
            </div> 
        </div>
    </header>
  )
}



export default Header
