import React from 'react';
import {FaGifts,FaListUl,FaUsers} from 'react-icons/fa';
import {BsFillEyeFill, BsCalendarPlusFill,BsPlusSquareFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';


function nav() {
  return (
    <div className='border col-2 m-0 p-0 '>
       <div className='row  p-2 bg-principal'>
             <h4 className='ml-4 text-white'><span className='text-white'>< FaGifts /></span>  NLH TECH</h4>
       </div>

       <nav className='mt-5 '>

          <ul className='navbar-nav p-0 m-0 bg-sinza'>
            <li className='nav-item border-inferior'>
              <button className='btn btn-block text-left'><BsPlusSquareFill/> Cadastrar produto</button>
            </li> 
            <li className='nav-item border-inferior' >
              <button className='btn btn-block text-left'><BsFillEyeFill/> Visualizar produtos</button>
              </li> 
            <li className='nav-item border-inferior '>
              <button className='btn btn-block text-left'><BsCalendarPlusFill/> Consultar Agenda</button>
            </li>            
            <li className='nav-item border-inferior  '> 
              <button className='btn btn-block text-left'>< FaListUl/> Encomendas</button>   
            </li> 
          </ul>

       </nav>
        <div className='w-100 bg-principal mt-3 mb-3 text-center'> 
          <span>Definições</span>
        </div>

        <ul className='navbar-nav p-0 m-0 bg-sinza'>
            <li className='nav-item border-inferior' >
              <button className='btn btn-block text-left'><FaUsers/> Funcionários</button>
            </li> 
            <li className='nav-item border-inferior btn btn-danger text-left mt-3'><BiLogOutCircle/> Sair</li> 
           
          </ul>


    </div>
  )
}

export default nav
