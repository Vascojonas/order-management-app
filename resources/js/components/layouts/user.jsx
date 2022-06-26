import React from 'react'
import {NavLink, Link,Outlet} from 'react-router-dom';
import {FaGifts} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BsInstagram, BsTwitter, BsWhatsapp, BsTelephoneOutboundFill, BsFillPersonFill} from 'react-icons/bs'


function user() {
  return (
    <div className=''>
        <header className='border border-secondary nav-principal bg-principal zindex-sticky'>
            <nav className='d-flex justify-content-between navbar navbar-expand-lg navbar-light '>
              
              <div className=''>
                <h4 className='ml-4 '><span className='text-golden'>< FaGifts /></span>  NLH TECH</h4>
              </div>
             
              <div className=" justify-content-end collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav nav-header">
                    <li className="nav-item active">
                    </li>
                    <li className="nav-item">
                      <NavLink to='/ecomendas' className="nav-link" href="#">Encomendas</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to='/minha_conta' className="nav-link" href="#"><BsFillPersonFill /> Minha conta</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to='carrinho' className="nav-link " href="#"> <FontAwesomeIcon icon="fa-solid fa-cart-shopping-fast" />Carinho</NavLink>
                    </li>
                  </ul>
              </div>
            </nav>
        </header>
        <div className='container  h-100'>
             <Outlet />
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
                            <Link to='#' className="nav-link text-secondary p-0 m-0" href="#">Minha Conta</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" href="#">Histórico de encomendas</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" href="#">Solicitar devolução</Link>
                          </li>
            
                        </ul>
                        
                  </div>
                  <div className='box-rodape  col-2'>
                    <h5> Apoio ao cliente</h5>
                    <ul className="nav flex-column  p-0">
                          <li className="nav-item p-0 m-0  ">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" href="#">Sobre Nós</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" href="#">Informações de Entrega</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link text-secondary p-0 m-0" href="#">Métodos de pagamento</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link  text-secondary p-0 m-0 " href="#">Termos e condições</Link>
                          </li>
                          <li className="nav-item">
                            <Link to='#' className="nav-link  text-secondary p-0 m-0 " href="#">Entre em contacto</Link>
                          </li>
                        </ul>
                  </div>

                  <div className='box-rodape col-4 '>
                    <h5> Entre em Contacto</h5>

                    <div className='mt-5 d-flex justify-content-center'>
                        <Link to='#' className='btn btn-outline-dark' title='Istagram'><BsInstagram size={30} /></Link>
                        <Link to='#' className='btn btn-outline-dark' title='Twitter'><BsTwitter size={30} /></Link>
                        <Link to='#' className='btn btn-outline-dark' title='Whatsapp'><BsWhatsapp size={30} /></Link>
                   </div>
                   <div className='text-center'>
                     <Link to='#' className='btn btn-outline-dark' title='Telefone'><BsTelephoneOutboundFill size={30}/> 843235673</Link>

                   </div>
                  </div>
            
              
            </div>
        </footer>
    </div>
  )
}

export default user
