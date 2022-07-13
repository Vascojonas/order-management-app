import React, {useState,  useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom';

import {IoSearch} from 'react-icons/io5';

function funcionario() {
const [loading, setLoading] = useState(true);
const [funcionario, setFuncionario] = useState();

useEffect(() => {

    axios.get(`/api/admin/funcionarios/listar`).then(res=>{
        if(res.status === 200)
        {
            setFuncionario(res.data.fucionarios)
             console.log(res.data.fucionarios)
             if(res.data.fucionarios){
              setLoading(false);
            }   
        }
    });

}, []);

const deleteUser = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`/api/admin/funcionarios/delete/${id}`).then(res=>{
        if(res.data.status === 200)
        {
            swal("Eliminado!",res.data.message,"success");
            thisClicked.closest("tr").remove()   
        }
        else if(res.data.status === 404)
        {
            swal("Ops",res.data.message,"error");
            thisClicked.innerText = "Delete";
        }

    });
}


    if(loading){
        return (
            <div style={{height:'68%'}}>
                <div className='m-3 row'>
                    < h4 >Funcionários</h4>
        
                  
                        <ul className='nav justify-content-center ml-auto'>
                            <li className='nav-item'>
                                <NavLink to='/admin/funcionarios' className='nav-link btn btn-outline-secondary mr-2'>Todos funcionários</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/admin/funcionarios/cadastrar' className='nav-link btn btn-outline-secondary'>Cadastrar</NavLink>
                            </li>
        
                        </ul>
                </div>
        
                <div >
        
                    <div className=''>
                    <div className='row input-group col-12'>
                        <div className=' col-6 p-0' >
                            <input className='form-control border border-golden text-black' type="text" name="pesquisar" id="pesquisar"
                            placeholder="Pesquisar..."/>
                        </div>
                        <button className='btn btn bg-principal'><IoSearch/></button>
                    </div>
                    </div>
        
                </div>

                <div className=' text-center mt-3 h-100 ' >
                    <div className='d-flex  align-items-center h-100 text-center'>
                        <div className='w-100'>SEM DADOS</div>
                     </div>
                </div>
        
        
            </div>
          )
    }else{

        let i=0;
        const FUNCIONARIO_TABLE = funcionario.map((item, key)=>{
                return(
    
                    <tr key={key}>
                          <th scope="row" className=' list-img p-0'>
                              {++i}
                          </th>
                          <td>
                            {item.nome}
                          </td>
                          <td >
                            {item.apelido}
                          </td>
                          <td>{item.email}</td>
                          <td>{item.tel1}</td>
                        <td >
                            {item.perfil}
                        </td>
                        <td width="160">
                            <a href="#" className="btn btn-sm btn-circle btn-outline-golden " title="Visualizar"><i class="fa fa-eye"></i></a>
                            <Link to={`/admin/produtos/cadastrar/${item.id}`} class="btn btn-sm btn-circle bg-principal ml-1 mr-1" title="Editar"><i class="fa fa-edit"></i></Link>
                            <button class="btn btn-sm btn-circle  btn btn-outline-danger"  onClick={(e) => deleteUser(e, item.id)} title="Deletar"><i class="fa fa-times"></i></button>
                        </td>
                     </tr>
                )               
            })

        
        return (
        <div>
            <div className='m-3 row'>
                < h4 >Funcionários</h4>
    
                
                    <ul className='nav justify-content-center ml-auto'>
                        <li className='nav-item'>
                            <NavLink to='/admin/funcionarios' className='nav-link btn btn-outline-secondary mr-2'>Todos funcionários</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/admin/funcionarios/cadastrar' className='nav-link btn btn-outline-secondary'>Cadastrar</NavLink>
                        </li>
    
                    </ul>
            </div>
    
            <div >
    
                <div className=''>
                <div className='row input-group col-12'>
                    <div className=' col-6 p-0' >
                        <input className='form-control border border-secondary text-black' type="text" name="pesquisar" id="pesquisar"
                        placeholder="Pesquisar..."/>
                    </div>
                    <button className='btn btn bg-principal'><IoSearch/></button>
                </div>
                </div>
    
                <div className='mt-3'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Apelido</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Perfil</th>
                                        <th>Ações</th>
                                </tr>

                            </thead>
    
                            <tbody>
                                {FUNCIONARIO_TABLE}

                            </tbody>
                        </table>
                </div>  
    
            </div>
    
    
        </div>
        )
    }

}

export default funcionario
