import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import AdminLayout from "./layouts/admin";
import UserLayout from "./layouts/user";
import ProdutoCadastrar from "../../pages/admin/produtoCadastrar";
import ProdutoListar from "../../pages/admin/produtoListar";
import Funcionarios from "../../pages/admin/funcionarios";
import FuncionarioCadastro from "../../pages/admin/funcionarioCadastro";
import Main from "../../pages/public/main";
import Personalizar from "../../pages/public/personalizarEncomenda";
import Carinho from "../../pages/public/carinho";



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";


function App(){

    
    return (
        
        <Router >
            
             <Routes >
                <Route path="/" element={<UserLayout />} >
                  <Route path='/' element={<Main/>}/>
                  <Route path='/encomendas/personalizar' element={<Personalizar/>}/>
                  <Route path='/encomendas/carinho' element={<Carinho/>}/>
                </Route>

                <Route exact path="/admin/" element={<AdminLayout />} >
                    <Route path='/admin/produtos/cadastrar' element={<ProdutoCadastrar/>}/>
                    <Route path='/admin/produtos/listar' element={<ProdutoListar/>}/>
                     <Route path='/admin/funcionarios' exact element={<Funcionarios/>}/>
                    <Route path='/admin/funcionarios/cadastrar'  element={<FuncionarioCadastro/>}/>
                </Route>
            </Routes>

      </Router>

   
    )
}

export default App