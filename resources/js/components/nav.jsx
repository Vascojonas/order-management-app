import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaGifts,FaListUl,FaUsers, FaMoneyCheckAlt} from 'react-icons/fa';
import {BsFillEyeFill, BsCalendarPlusFill,BsPlusSquareFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';


function nav() {
  return (
    <div className='border-right col-2 m-0 p-0 '>
       <div className='row p-3  bg-principal cabecalho'>
             <h4 className='ml-4 text-white'><span className='text-white'>< FaGifts /></span>  NLH TECH</h4>
       </div>

       <nav className='mt-5 '>

          <ul className='navbar-nav p-0 m-0 '>
            <li className='nav-item border-inferior'>
              <NavLink to='/admin/produtos/cadastrar' className='btn btn-block text-left'><BsPlusSquareFill/> Cadastrar produto</NavLink>
            </li> 
            <li className='nav-item border-inferior' >
              <NavLink to='/admin/produtos/listar' className='btn btn-block text-left'><BsFillEyeFill/> Visualizar produtos</NavLink>
              </li> 
            <li className='nav-item border-inferior '>
              <NavLink to='/admin/produtos/agenda' className='btn btn-block text-left'><BsCalendarPlusFill/> Consultar Agenda</NavLink>
            </li>            
            <li className='nav-item border-inferior  '> 
              <NavLink to='/admin/produtos/encomendas' className='btn btn-block text-left'>< FaListUl/> Encomendas</NavLink>   
            </li> 

            <li className='nav-item border-inferior  '> 
              <NavLink to='/admin/clientes' className='btn btn-block text-left'>< FaUsers/> Clientes</NavLink>   
            </li> 

            <li className='nav-item border-inferior  '> 
              <NavLink to='/admin/pagamentos' className='btn btn-block text-left'>< FaMoneyCheckAlt/> Pagamentos</NavLink>   
            </li>

            <li className='nav-item border-inferior' >
              <NavLink to='/admin/funcionarios' className='btn btn-block text-left'><FaUsers/> Funcionários</NavLink>
            </li>  
          </ul>

       </nav>
        

        <ul className='navbar-nav p-0 m-0  mt-5'>
            
            <li className='nav-item border-inferior btn btn-danger text-left mt-3'><BiLogOutCircle/> Sair</li> 
           
          </ul>


    </div>
  )
}

export default nav
