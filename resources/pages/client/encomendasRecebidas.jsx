import React, {useState,  useEffect} from 'react'
import { Link,NavLink, } from 'react-router-dom'
import AuthUser from '../../js/components/AuthUser';

function encomendasRecebidas() {

    const {getToken, getUser} = AuthUser();
    const [user, setUser] = useState(getUser());

  const [pendentes, setPedentes]= useState(true);
  const [loading, setLoading] = useState(false);

  const [encomendas, setEncomendas] = useState([]);
  const [details, setDetails] = useState(false);

  const [encomenda, setEncomenda]= useState({
    nome: '',
    apelido: '',
    telefone: '',
    email: '',
    imagem: '',
    imagem_ass: '',
    descricao: '',
    status: ''
})


  useEffect(() => {

    
          axios.get(`/api/admin/encomendas/listar`).then(res=>{
              if(res.status === 200){
              
                  setEncomendas(res.data.data)
                  //console.log(res.data.data)
                    
              }
            })
      
    }, []);


    const detalhes = (e,id)=>{
        e.preventDefault();
       
        setEncomenda(...encomendas.filter((item)=> item.encomendaId==id));
        setDetails(!details);
    }


  if(loading){
    return (
        <div style={{height:'68%'}}>
            <div className='m-3 row'>
                < h4 >Encomendas recebidas</h4>
    
              
                    <ul className=' nav justify-content-center ml-auto'>
                        <li className='nav-item'>
                            <NavLink to='/cliente/encomendas'  className='nav-link btn btn-outline-secondary mr-2'  >Pendentes</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/cliente/encomendas/recebidas'  className='nav-link btn btn-outline-secondary'  >Recebidas</NavLink>
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
                    <div className='w-100'>Sem encomendas recebidas</div>
                 </div>
            </div>
    
    
        </div>
      )
}else{

    const encomendas_TABLE = encomendas.map((item, key)=>{

                return (item.status==3&&user.email===item.email)&&(
        
                        <tr key={key}>
                              <th scope="row" className=' list-img p-0'>
                                    <img className='list-img' src={item.imagem}></img>
                              </th>
                              <td>{item.quantidade}</td>
                              <td>{item.valor}MT</td>
                              <td>{item.valor*item.quantidade}MT</td>
                            <td >
                                {((item.prazo).split(" "))[0]}
                            </td>
                            <td >
                                <button  onClick={(e) => detalhes(e, item.encomendaId)} className="btn btn-sm btn-circle btn-outline-golden mr-1 " title="Visualizar"><i className="fa fa-eye"></i></button>
                            </td>
                         </tr>
                    )               

            }   
    )
        

    
    return (
    <div>
       <div className='m-3 row'>
                < h4 >Encomendas recebidas</h4>
    
              
                <ul className=' nav justify-content-center ml-auto'>
                        <li className='nav-item'>
                            <NavLink to='/cliente/encomendas'  className='nav-link btn btn-outline-secondary mr-2'  >Pendentes</NavLink>
                        </li>

                        <li className='nav-item'>
                            <NavLink to='/cliente/encomendas/recebidas'  className='nav-link btn btn-outline-secondary'  >Recebidas</NavLink>
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
            
            <div className="d-flex">
                <div className='col-6 encomendas-views' style={{height: "340px"}}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                        <th>Imagem</th>
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
                <div className="col-6">

                   { (details)&&(<div>
                    <h5>Produto por pesonalizar</h5>
                    
                    <div className="d-flex">

                        <div className="col-6  ">

                            <div className='form-group row ml-2 '>
                            
                        </div>

                        <div className='form-group row ml-2'>
                                <div className=''>
                                    <img  style={{width: "250px"}} src={encomenda.imagem} alt="imagem do brinde" />
                                </div>
                            </div>
                        
                        </div>
                        <div className="col-6 ">
                        

                        <div className='form-group d-flex ml-2 '>
                            <h5>Dados da personalização</h5>
                        </div>

                        <div className='form-group row ml-2 mt-3'>
                                <div className="">
                                    <h5>Descrição</h5>
                                    <p>
                                        {encomenda.descricao}
                                    </p> 

                                </div>
                            </div>

                            {(encomenda.imagem_ass!='...')&&(<div className='form-group row ml-2 mt-1 '>
                                
                                <div className={`text-center `}  >
                                        <div className=''>
                                            <img  style={{width: "250px"}}  src={encomenda.imagem_ass}  />
                                        </div>
                                </div>
                            </div>)}


                            
                        </div>
                    </div>

                    </div>)}
                </div>
            </div>

        </div>


    </div>
    )
}
}

export default encomendasRecebidas