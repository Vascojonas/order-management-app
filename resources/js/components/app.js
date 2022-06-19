import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./header";
import Nav from "./nav";
import ProdutoCadastrar from "../../pages/produtoCadastrar";
import ProdutoListar from "../../pages/produtoListar";
import Funcionarios from "../../pages/funcionarios";
import FuncionarioCadastro from "../../pages/funcionarioCadastro";




import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";





function App(){

    return (
        
        <Router>

            <div className="d-flex h">
                <Nav  />
                <div className="col-10 ">
                
                <Header />
                 <Routes>
                    <Route path='/admin/produtos/cadastrar' element={<ProdutoCadastrar/>}/>
                    <Route path='/admin/produtos/listar' element={<ProdutoListar/>}/>
                    <Route path='/admin/funcionarios' exact element={<Funcionarios/>}/>
                    <Route path='/admin/funcionarios/cadastrar'  element={<FuncionarioCadastro/>}/>

                </Routes>

                </div>

                
            </div>
     </Router>
    )
}

export default App