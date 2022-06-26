import React from 'react'
import {Outlet} from 'react-router-dom';
import {FaGifts} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BsInstagram, BsTwitter, BsWhatsapp, BsTelephoneOutboundFill, BsFillPersonFill} from 'react-icons/bs'


function user() {
  return (
    <div className='h-8'>
        <header className='border border-secondary nav-principal'>
            <nav className='d-flex justify-content-between navbar navbar-expand-lg navbar-light '>
              
              <div className=''>
                <h4 className='ml-4 '><span className=''>< FaGifts /></span>  NLH TECH</h4>
              </div>
             
              <div className=" justify-content-end collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav nav-header">
                    <li className="nav-item active">
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Encomendas</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#"><BsFillPersonFill /> Minha conta</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " href="#"> <FontAwesomeIcon icon="fa-solid fa-cart-shopping-fast" />Carinho</a>
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
                      <ul class="nav flex-column  p-0">
                          <li class="nav-item p-0 m-0  ">
                            <a class="nav-link text-secondary p-0 m-0" href="#">Minha Conta</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link text-secondary p-0 m-0" href="#">Histórico de encomendas</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link text-secondary p-0 m-0" href="#">Solicitar devolução</a>
                          </li>
            
                        </ul>
                        
                  </div>
                  <div className='box-rodape  col-2'>
                    <h5> Apoio ao cliente</h5>
                    <ul class="nav flex-column  p-0">
                          <li class="nav-item p-0 m-0  ">
                            <a class="nav-link text-secondary p-0 m-0" href="#">Sobre Nós</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link text-secondary p-0 m-0" href="#">Informações de Entrega</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link text-secondary p-0 m-0" href="#">Métodos de pagamento</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link  text-secondary p-0 m-0 " href="#">Termos e condições</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link  text-secondary p-0 m-0 " href="#">Entre em contacto</a>
                          </li>
                        </ul>
                  </div>

                  <div className='box-rodape col-4 '>
                    <h5> Entre em Contacto</h5>

                    <div className='mt-5 d-flex justify-content-center'>
                        <a href='# ' className='btn btn-outline-dark' title='Istagram'><BsInstagram size={30} /></a>
                        <a href='# ' className='btn btn-outline-dark' title='Twitter'><BsTwitter size={30} /></a>
                        <a href='# ' className='btn btn-outline-dark' title='Whatsapp'><BsWhatsapp size={30} /></a>
                   </div>
                   <div className='text-center'>
                    <a href='# ' className='btn btn-outline-dark' title='Telefone'><BsTelephoneOutboundFill size={30}/> 843235673</a>

                   </div>
                  </div>
            
              
            </div>
        </footer>
    </div>
  )
}

export default user
