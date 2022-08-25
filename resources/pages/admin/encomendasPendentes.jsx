import React, {useState,  useEffect} from 'react'
import {Link,NavLink, useOutletContext } from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';
import {BsArrowRepeat, BsCheckSquareFill} from 'react-icons/bs'
 

function encomendas() {

   const [pendentes, setPedentes]= useState(true);
   const [loading, setLoading] = useState(false);
   const [encomendas, setEncomendas] = useOutletContext();

  

   

if(loading){
    return (
        <div style={{height:'68%'}}>
            <div className='m-3 row'>
                < h4 >Encomendas</h4>
    
              
                    <ul className=' nav justify-content-center ml-auto'>
                        <li className='nav-item'>
                            <NavLink to='/admin/produtos/encomendas/pendentes'  className='nav-link btn btn-outline-secondary mr-2'  >Pendentes</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/admin/produtos/encomendas/finalizadas'   className='nav-link btn btn-outline-secondary mr-2'  >Finalizados</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/admin/produtos/encomendas/entregues'  className='nav-link btn btn-outline-secondary'  >Entregues</NavLink>
                        </li>
                    </ul>
        </div>
    
            <div >
    
                {/*<div className=''>
                <div className='row input-group col-12'>
                    <div className=' col-6 p-0' >
                        <input className='form-control border border-golden text-black' type="text" name="pesquisar" id="pesquisar"
                        placeholder="Pesquisar..."/>
                    </div>
                   
                </div>
                </div>*/}
    
            </div>

            <div className=' text-center mt-3 h-100 ' >
                <div className='d-flex  align-items-center h-100 text-center'>
                    <div className='w-100'>SEM DADOS</div>
                 </div>
            </div>
    
    
        </div>
      )
}else{

    const encomendas_TABLE = encomendas.map((item, key)=>{
        let status;
        if(pendentes){
            status=1;
        }else{
            status=2;
        }
        
        if(item.status==status){
                return(
        
                        <tr key={key}>
                              <th scope="row" className=' list-img p-0'>
                                    <img className='list-img' src={item.imagem}></img>
                              </th>
                              <td>
                                {item.nome+' '+item.apelido}
                              </td>
                              <td >
                                {item.telefone}
                              </td>
                              <td>{item.quantidade}</td>
                              <td>{item.valor} MT</td>
                              <td>{item.valor*item.quantidade} MT</td>
                            <td >
                                {((item.prazo).split(" "))[0]}
                            </td>
                            <td width="130">
                                <Link to={'/admin/encomenda/details/'+item.encomendaId} className="btn btn-sm btn-circle btn-outline-golden mr-1 " title="Visualizar"><i className="fa fa-eye"></i></Link>
                                <button className="btn btn-sm btn-circle  btn btn-outline-danger"   title="Deletar">< BsArrowRepeat /></button>
                            </td>
                         </tr>
                    )               

            }   
        })
        

    
    return (
    <div>
       <div className='m-3 row'>
                < h4 >Encomendas</h4>
    
              
                    <ul className=' nav justify-content-center ml-auto'>
                        <li className='nav-item'>
                            <NavLink to='/admin/produtos/encomendas/pendentes'  className='nav-link btn btn-outline-secondary mr-2'  >Pendentes</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/admin/produtos/encomendas/finalizadas'   className='nav-link btn btn-outline-secondary mr-2'  >Finalizados</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/admin/produtos/encomendas/entregues'  className='nav-link btn btn-outline-secondary'  >Entregues</NavLink>
                        </li>
                    </ul>
        </div>
        <div >

             {/*<div className=''>
                <div className='row input-group col-12'>
                    <div className=' col-6 p-0' >
                        <input className='form-control border border-golden text-black' type="text" name="pesquisar" id="pesquisar"
                        placeholder="Pesquisar..."/>
                    </div>
                   
                </div>
                </div>*/}

            <div className='mt-3 list-admin'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                    <th>Imagem</th>
                                    <th>Proprietário</th>
                                    <th>Telefone</th>
                                    <th>Quant</th>
                                    <th>Valor</th>
                                    <th>Total</th>
                                    <th>Prazo</th>
                                    <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody id='table-body'>
                         {encomendas_TABLE}
                        </tbody>
                    </table>
            </div>  

        </div>


    </div>
    )
}
}

export default encomendas