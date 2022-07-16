import React, {useState, useEffect} from 'react'
import {useOutletContext } from 'react-router-dom';
import AuthUser from './AuthUser';
import axios from 'axios';
import {NavLink, Link} from 'react-router-dom';

import Logo from './layouts/logo.jpg';


import {FaGifts, FaTransgender} from 'react-icons/fa';
import {BsInstagram, BsTwitter, BsWhatsapp, BsTelephoneOutboundFill,
    BsFillPersonFill, BsPlusCircle,BsCart3, BsFillHouseDoorFill ,BsCartPlus,BsCartX,BsCartCheck} from 'react-icons/bs'
import user from './layouts/user';
 
 

function login() {


    const{ http, setToken}= AuthUser();
    const [userInput, setUser]= useState({
        email:'',
        password:'',
        error_list: [],
    });


    const submitForm = (e)=>{
        e.preventDefault();


        let data ={
            email: userInput.email,
            password: userInput.password,
            
        }
        
        
        http.post('/login', data)
        .then((res)=>{
        
                let user= res.data.users;
                axios.get('/user/role/'+user.id)
                .then((resp)=>{
    
                    user.role=resp.data.role.nome;
                   // console.log(user);
                    setToken(res.data.users, res.data.access_token)
                })
        }).catch((erro)=>{
            setUser({...userInput, error_list: {erro:"Email e (ou ) senha inválida!"}});
        });
    }

    const handleInput =(e)=>{
        e.persist();
        setUser({...userInput, [e.target.name]: e.target.value })

        if(userInput.error_list.erro){
          setUser({...userInput, error_list: ''});
        }
    }

  return (
    <div>
      <header className='border-golden  nav-principal bg-principal pr-4 zindex-sticky'>
            <nav className='d-flex justify-content-between navbar navbar-expand-lg navbar-light -mr-3 p-0 '>
              
              <div className=''>
                <h4 className='ml-4 '><span className='text-golden'><img className='logo' src={Logo} /></span> Tsakissa</h4>
              </div>
             
              <div className=" justify-content-end collapse navbar-collapse" id="navbarNav ">
                  <ul className="navbar-nav nav-header  ">
                    <li className="nav-item">
                      <NavLink to='/' className="nav-link text-dark" ><BsFillHouseDoorFill size={15}/> Home</NavLink>
                    </li>
                    
                  </ul>
              </div>
            </nav>
        </header>

            <div className='d-flex justify-content-center align-items-center  vazia  '>
                    <div className='col-6  mt-5 p-5 mt-5 border border-golden'>
                        <h5 align='center'>Login</h5>
                        <div className='form-group row mt-3 ml-2'>
                                <label htmlFor="email" className="col-md-4 col-form-label ">Email</label>
                                <div className="col-md-8">
                                <input className={`form-control border-golden ${userInput.error_list.erro&&('input-erro')} `} id="email" name="email" onChange={handleInput} value={userInput.email} 
                                placeholder="Digite o seu email " />
                                <span className="text-danger">{userInput.error_list.email}</span>
                                </div>
                            </div>


                            <div className='form-group row ml-2'>
                                <label htmlFor="password" className="col-md-4 col-form-label ">Password</label>
                                <div className="col-md-8">
                                <input className={`form-control border-golden ${userInput.error_list.erro&&('input-erro')} `} type="password" id="password" name="password" onChange={handleInput} value={userInput.password} 
                                placeholder="Digite o seu password" />
                                <div className="text-danger">{userInput.error_list.password}</div>
                                </div>
                            </div>

                            <span className="text-danger  d-flex justify-content-center">{userInput.error_list.erro}</span>
                            
                            <div className='form-group row ml-2'>
                                <button onClick={submitForm} className='btn bg-principal btn-block'>Entrar</button>
                            </div>

                            <div className="col-12">
                                Ainda não tens conta? <Link to='/clientes/cadastrar' className=''>clique aqui!</Link>
                            </div>
                
                    </div>
            </div>


    </div>

  )
}

export default login