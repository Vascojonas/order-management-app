import React, {useState, useEffect} from 'react'
import {useOutletContext } from 'react-router-dom';
import AuthUser from './AuthUser';
import axios from 'axios';

function login() {

    const [footer, setfooter] = useOutletContext();
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
    }

  return (  
   <div className='conteudo mb-5 h-8 '>
         <div className='col-6 offset-3 mt-5 p-5 mt-5 border border-golden'>
            <h5 align='center'>Login</h5>
             <div className='form-group row mt-3 ml-2'>
                    <label htmlFor="email" className="col-md-4 col-form-label ">Email</label>
                    <div className="col-md-8">
                     <input className="form-control border-golden " type="text" id="email" name="email" onChange={handleInput} value={userInput.email} 
                      placeholder="Digite o seu email " />
                    <span className="text-danger">{userInput.error_list.email}</span>
                    </div>
                </div>


                <div className='form-group row ml-2'>
                    <label htmlFor="password" className="col-md-4 col-form-label ">Password</label>
                    <div className="col-md-8">
                     <input className="form-control border-golden " type="password" id="password" name="password" onChange={handleInput} value={userInput.password} 
                      placeholder="Digite o seu password" />
                     <div className="text-danger">{userInput.error_list.password}</div>
                    </div>
                </div>

                <span className="text-danger  d-flex justify-content-center">{userInput.error_list.erro}</span>
                
                <div className='form-group row ml-2'>
                    <button onClick={submitForm} className='btn bg-principal btn-block'>Logar</button>
                </div>
    
        </div>
   </div>
  )
}

export default login