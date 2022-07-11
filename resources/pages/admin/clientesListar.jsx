import React, {useState,  useEffect} from 'react'
import { NavLink, Link } from 'react-router-dom';

import {IoSearch} from 'react-icons/io5';

function clientesListar() {
  const [loading, setLoading] = useState(true);
const [cliente, setCliente] = useState();

useEffect(() => {

    axios.get(`/api/admin/clientes/listar`).then(res=>{
        if(res.status === 200)
        {
            setCliente(res.data.clientes)
             console.log(res.data.clientes)

             

             if(res.data.clientes){
              setLoading(false);
            }   
        }
    });

}, []);

const deleteUser = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    const userId=id;
    console.log(userId);

    axios.delete('/api/admin/clientes/delete/'+userId).then(res=>{
        if(res.data.status === 200)
        {
            swal("Eliminadao!",res.data.message,"Sucesso!");
            thisClicked.closest("tr").remove()   
        }
        else if(res.data.status === 404)
        {
            swal("Error",res.data.message,"error");
            thisClicked.innerText = "Eliminar";
        }

    });
}


    if(loading){
        return (
            <div style={{height:'68%'}}>
                <div className='m-3 row'>
                    < h4 >Clientes</h4>
        
                  
    
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
        const cliente_TABLE = cliente.map((item, key)=>{
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
                        <td width="155">
                            <a href="#" className="btn btn-sm btn-circle btn-outline-golden mr-2" title="Visualizar"><i class="fa fa-eye"></i></a>
                            <button class="btn btn-sm btn-circle  btn btn-outline-danger"  onClick={(e) => deleteUser(e, item.id)} title="Deletar"><i class="fa fa-times"></i></button>
                        </td>
                     </tr>
                )               
            })

        
        return (
        <div>
            <div className='m-3 row'>
                < h4 >Clientes</h4>
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
                                {cliente_TABLE}

                            </tbody>
                        </table>
                </div>  
    
            </div>
    
    
        </div>
        )
    }
}

export default clientesListar
