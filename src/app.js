import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from "./components/header";
import Nav from "./components/nav";
import ProdutoCadastrar from "./pages/produtoCadastrar";
import ProdutoListar from "./pages/produtoListar";





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

                </Routes>
                </div>

                
            </div>
     </Router>
    )
}

export default App