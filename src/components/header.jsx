import React from 'react'

import {TbMessageCircle} from 'react-icons/tb'
import {IoIosNotifications} from 'react-icons/io';
import {IoCalendar,IoSearch} from 'react-icons/io5';

function Header() {
  return (
    <header>
        <div className="row bg-principal">
            <div className='row input-group col-6  px-2 py-2 ml-3'>
              <div className=' col-10 p-0' >
                <input className='form-control bg-principal text-black' type="text" name="pesquisar" id="pesquisar" 
                placeholder="Pesquisar..."/>
              </div>
               <button className='btn btn-outline-light'><IoSearch/></button>
            </div>

            <div className='ml-auto '>
               <button className='btn btn-outline-light m-2 '><IoIosNotifications/></button>
               <button className='btn btn-outline-light m-2 '> <IoCalendar/></button>
               <button className='btn btn-outline-light m-2 '> <TbMessageCircle/>  </button>
            </div>
        </div>
    </header>
  )
}



export default Header
