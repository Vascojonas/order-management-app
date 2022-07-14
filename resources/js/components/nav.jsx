import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import {FaGifts,FaListUl,FaUsers, FaMoneyCheckAlt} from 'react-icons/fa';
import {BsFillEyeFill, BsCalendarPlusFill,BsPlusSquareFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';

import AuthUser from './AuthUser';
import Logo from './layouts/logo.jpg';


function nav() {
const {getUser, logOut} = AuthUser();

const [user, setUser]=useState(getUser());

const logout =()=>{
    if(user!=undefined){
      logOut();
    }
}
  return (
    <div className='border-right col-2 m-0 p-0 '>
       <div className='row p-3  bg-principal cabecalho'>
            <h4 className='ml-4 mb-4'><span className='text-golden'><img className='logo' src={Logo} /></span> Tsakissa</h4>
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
              <NavLink to='/admin/produtos/encomendas/pendentes' className='btn btn-block text-left'>< FaListUl/> Encomendas</NavLink>   
            </li> 

            <li className='nav-item border-inferior  '> 
              <NavLink to='/admin/clientes' className='btn btn-block text-left'>< FaUsers/> Clientes</NavLink>   
            </li> 

           {(user.role==='admin')&&( <li className='nav-item border-inferior' >
              <NavLink to='/admin/funcionarios' className='btn btn-block text-left'><FaUsers/> Funcionários</NavLink>
            </li> )} 
          </ul>

       </nav>
        

        <ul className='navbar-nav p-0 m-0  mt-5 '>
            <li className='nav-item border-inferior mb-2  '> 
              <NavLink to='/' className='btn btn-block btn bg-principal text-left'> Ir para página</NavLink>   
            </li> 

            <li className='nav-item border-inferior'>
              <button onClick={logout} className='btn btn-block btn-danger text-left'>
                  <BiLogOutCircle/> Sair
              </button>
              </li> 
           
          </ul>


    </div>
  )
}

export default nav
