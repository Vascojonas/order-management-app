import React, {useState} from 'react'
import EncomendasData from './data/encomendasData';

import {NavLink, Link,Outlet} from 'react-router-dom';
import {FaGifts} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BsInstagram, BsTwitter, BsWhatsapp, BsTelephoneOutboundFill,
   BsFillPersonFill, BsPlusCircle,BsCart3, BsFillHouseDoorFill ,BsCartPlus,BsCartX,BsCartCheck} from 'react-icons/bs'


function user() {
  const [encomendas, setEncomendas]=useState(EncomendasData);
  return (
    <div className='h-full '>
        <header className='border-golden  nav-principal bg-principal pr-4 zindex-sticky'>
            <nav className='d-flex justify-content-between navbar navbar-expand-lg navbar-light -mr-3 p-0 '>
              
              <div className=''>
                <h4 className='ml-4 '><span className='text-golden'>< FaGifts /></span> Tsakissa</h4>
              </div>
             
              <div className=" justify-content-end collapse navbar-collapse" id="navbarNav ">
                  <ul className="navbar-nav nav-header ">
                    <li className="nav-item">
                      <NavLink to='/' className="nav-link text-dark" ><BsFillHouseDoorFill size={15}/> Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/encomendas/personalizar' className="nav-link text-dark" >Minha encomenda <BsPlusCircle size={15}/></NavLink>
                    </li>
                    <li className="nav-item">
                  
                            
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 <BsFillPersonFill /> Minha conta
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <NavLink exact to='clientes/cadastrar' className="dropdown-item btn" >Cadastrar-se</NavLink>
                                <NavLink exact to='/login' className="dropdown-item " >Acessar</NavLink>
                              </div>
                            </div>
                
                    </li>
                    <li className="nav-item m">
                          <NavLink to='/encomendas/carinho' className="nav-link  text-dark" >
                             <BsCart3 size={25}/><span className='float-right number-box text-dark mt-0'>{encomendas.length}</span> 
                          </NavLink>
                    </li>
                  </ul>
              </div>
            </nav>
        </header>
        <div className='container  h-100'>
             <Outlet context={[encomendas, setEncomendas]} />
        </div>  

        <footer className=' bg-principal'>
              <div className='d-flex m-3 mt-5'>
                  <div className='box-rodape col-4 '>
                    <h5> Quem somos Nós </h5>
                    <p className='text-secondary'>
                      orem Ipsum is simply dummy text of the printing and typesetting 
                      industry. Lorem Ipsum has been the industry's standard dummy text ever 
                      since the 1500s.


                    </p>
                  </div>
                  <div className='box-rodape col-2  '>
                      <h5> Apoio ao cliente</h5>
                      <ul className="nav flex-column  p-0">
                          <li className="nav-item p-0 m-0  ">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" >Minha Conta</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" >Histórico de encomendas</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" >Solicitar devolução</Link>
                          </li>
            
                        </ul>
                        
                  </div>
                  <div className='box-rodape  col-2'>
                    <h5> Apoio ao cliente</h5>
                    <ul className="nav flex-column  p-0">
                          <li className="nav-item p-0 m-0  ">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" >Sobre Nós</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" >Informações de Entrega</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" >Métodos de pagamento</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link  text-secondary p-0 m-0 " >Termos e condições</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link  text-secondary p-0 m-0 " >Entre em contacto</Link>
                          </li>
                        </ul>
                  </div>

                  <div className='box-rodape col-4 '>
                    <h5> Entre em Contacto</h5>

                    <div className='mt-5 d-flex justify-content-center'>
                        <Link to='#' className='btn btn-outline-dark b-rounded' title='Istagram'><BsInstagram size={30} /></Link>
                        <Link to='#' className='btn btn-outline-dark b-rounded' title='Twitter'><BsTwitter size={30} /></Link>
                        <Link to='#' className='btn btn-outline-dark b-rounded' title='Whatsapp'><BsWhatsapp size={30} /></Link>
                   </div>
                   <div className='text-center'>
                     <Link to='#' className='btn btn-outline-dark b-rounded' title='Telefone'><BsTelephoneOutboundFill size={30}/> 843235673</Link>
                   </div>
                   <div className='text-end'>
                     <Link to='admin/produtos/cadastrar' className='nav-link text-dark' >.</Link>
                   </div>
                  </div>
            
              
            </div>
        </footer>
    </div>
  )
}



export default user
