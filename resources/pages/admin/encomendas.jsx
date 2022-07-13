import React, {useState,  useEffect} from 'react'
import { button, Link } from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';


function encomendas() {

   const [pendentes, setPedentes]= useState(true);
   const [loading, setLoading] = useState(true);
   const [encomendas, setEncomendas] = useState();



const  handleConteudo =()=>{
    setPedentes(!pendentes);

    document.getElementById('table-body').innerHTML= encomendas_TABLE;
}   


   useEffect(() => {

    axios.get(`/api/admin/encomendas/listar`).then(res=>{
        if(res.status === 200)
        {
            setEncomendas(res.data.data)
             console.log(res.data.data)
             if(res.data.data){
              setLoading(false);
            }   
        }
    });

    }, []);

if(loading){
    return (
        <div style={{height:'68%'}}>
            <div className='m-3 row'>
                < h4 >Encomendas</h4>
    
              
                    <ul className='nav justify-content-center ml-auto'>
                        <li className='nav-item'>
                            <button to='/admin/produtos/encomendas' className='nav-link btn btn-outline-secondary mr-2' onChange={handleConteudo} >Pendentes</button>
                        </li>
                        <li className='nav-item'>
                            <button to='/admin/encomendass/cadastrar' className='nav-link btn btn-outline-secondary' onChange={handleConteudo} >Devolvidas</button>
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
                                {item.prazo}
                            </td>
                            <td width="160">
                                <a href="#" className="btn btn-sm btn-circle btn-outline-golden " title="Visualizar"><i className="fa fa-eye"></i></a>
                                <Link to={`/admin/produtos/cadastrar/${item.id}`} className="btn btn-sm btn-circle bg-principal ml-1 mr-1" title="Editar"><i className="fa fa-edit"></i></Link>
                                <button className="btn btn-sm btn-circle  btn btn-outline-danger"  onClick={(e) => deleteUser(e, item.id)} title="Deletar"><i className="fa fa-times"></i></button>
                            </td>
                         </tr>
                    )               

            }   
        })
        

    
    return (
    <div>
        <div className='m-3 row'>
            < h4 >Encomendas</h4>

            
                <ul className='nav justify-content-center ml-auto'>
                    <li className='nav-item'>
                        <button  className='nav-link btn btn-outline-secondary mr-2' onChange={handleConteudo} >Pendentes</button>
                    </li>
                    <li className='nav-item'>
                        <button  className='nav-link btn btn-outline-secondary' onChange={handleConteudo} >Devolvidas</button>
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