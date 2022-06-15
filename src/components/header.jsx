import React from 'react'

import {TbMessageCircle} from 'react-icons/tb'
import {IoIosNotifications} from 'react-icons/io';
import {IoCalendar,IoSearch} from 'react-icons/io5';

function Header() {
  return (
    <header>
       <div className="row bg-principal cabecalho">
           {/*   <div className='row input-group col-6  px-2 py-2 ml-3'>
              <div className=' col-10 p-0' >
                <input className='form-control bg-principal text-black' type="text" name="pesquisar" id="pesquisar" 
                placeholder="Pesquisar..."/>
              </div>
               <button className='btn btn-outline-light'><IoSearch/></button>
         </div> */}

            <div className='ml-auto '>
              <div className=' box '>
                <span className='number-box'>1</span>
                <a className='btn-icon'> <IoIosNotifications size={25}/> </a>
              </div>
              <div className=' box '>
                <span className='number-box'>5</span>
                <a className='btn-icon'> <TbMessageCircle size={25}/> </a>
              </div>
              <div className=' box mr-5'>
                <span className='number-box'>2</span>
                <a className='btn-icon'> <IoCalendar size={25}/> </a>
              </div>
             
            </div>
        </div>
    </header>
  )
}



export default Header
