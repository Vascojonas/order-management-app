import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import AdminLayout from "./layouts/admin";
import UserLayout from "./layouts/user";
import ProdutoCadastrar from "../../pages/admin/produtoCadastrar";
import ProdutoListar from "../../pages/admin/produtoListar";
import Funcionarios from "../../pages/admin/funcionarios";
import FuncionarioCadastro from "../../pages/admin/funcionarioCadastro";
import Main from "../../pages/client/main";
import Personalizar from "../../pages/client/personalizarEncomenda";
import Carinho from "../../pages/client/carinho";
import ClienteCadastro from '../../pages/client/clienteCadastro';
import Login from './login';

import AuthUser from './AuthUser';

import axios from 'axios';
import { setWith } from 'lodash';
axios.defaults.baseURL = "http://localhost:8000/";


function App(){
  const {getToken, getUser} = AuthUser();
  const [user, setUser] = useState(getUser());
  
  const [isLoggedIn, setisLoggedIn] = useState(()=>{
    if(user){
      return true;
    }else{
      false
    }
  })

  const [role, setRole]= useState(()=>{
    if(user){
      if(user.role==='admin'){
        return 'admin';
     }else if(user.role==='editor'){
         return 'editor';
     }else if(user.role==='user'){
         return 'user';
     }
    }else{
      return null;
    }
  })


  if(isLoggedIn && role==='admin'||role==='editor'){
    return (    
         <Routes >
            <Route path="/" element={<UserLayout />} >
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<Main/>}/>
                <Route path='/encomendas/personalizar' element={<Personalizar/>}/>
                <Route path='/encomendas/carinho' element={<Carinho/>}/>
                <Route path='/clientes/cadastrar' element={<ClienteCadastro/>}/>
            </Route>

            <Route  element={<AdminLayout />} >
              <Route path='/admin/produtos/cadastrar' element={<ProdutoCadastrar/>}/>
              <Route path='/admin/produtos/listar' element={<ProdutoListar/>}/>
               <Route path='/admin/funcionarios' exact element={<Funcionarios/>}/>
              <Route path='/admin/funcionarios/cadastrar'  element={<FuncionarioCadastro/>}/>
            </Route>
         </Routes>
  
    );

  }else if(isLoggedIn && role==='user'){
    return(
        <Routes >
            <Route path="/" element={<UserLayout />} >
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Main/>}/>
              <Route path='/encomendas/personalizar' element={<Personalizar/>}/>
              <Route path='/encomendas/carinho' element={<Carinho/>}/>
              <Route path='/clientes/cadastrar' element={<ClienteCadastro/>}/>
            </Route>

            <Route  element={<UserLayout />} >
                <Route path='/admin/produtos/cadastrar' element={<Login/>}/>
                <Route path='/admin/produtos/listar' element={<Login/>}/>
                <Route path='/admin/funcionarios' exact element={<Login/>}/>
                <Route path='/admin/funcionarios/cadastrar'  element={<Login/>}/>
            </Route>
        </Routes>
    )
  }else if(!isLoggedIn){
     return(
      <Routes >
          <Route path="/" element={<UserLayout />} >
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Main/>}/>
            <Route path='/encomendas/personalizar' element={<Personalizar/>}/>
            <Route path='/encomendas/carinho' element={<Carinho/>}/>
            <Route path='/clientes/cadastrar' element={<ClienteCadastro/>}/>
          </Route>

          <Route  element={<UserLayout />} >
              <Route path='/admin/produtos/cadastrar' element={<Login/>}/>
              <Route path='/admin/produtos/listar' element={<Login/>}/>
              <Route path='/admin/funcionarios' exact element={<Login/>}/>
              <Route path='/admin/funcionarios/cadastrar'  element={<Login/>}/>
          </Route>
      </Routes>
    )
  } 
} 

export default App