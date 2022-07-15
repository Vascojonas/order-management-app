import React, {useState,  useEffect} from 'react'
import { button, Link, useParams, useOutletContext } from 'react-router-dom';

function encomendaDetalhes() {

const {id} = useParams();
const [encomendas, setEncomendas]= useOutletContext();
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

useEffect(()=>{

    axios.get(`/api/admin/encomendas/iten/`+id).then(res=>{
        if(res.status === 200)
        {
            console.log(res.data.data)
           setEncomenda(...res.data.data)  
        }else{
            console.log(res.data.data)
            
        }
    });

},[])


const finalizarEncomenda=(e,status)=>{
    e.persist();
    let data={
        id: id,
        status:status
    }

    axios.put(`/api/admin/encomendas/update/status`, data).then(res=>{
        if(res.status === 200)
        {
            console.log(res.data.data)
            encomendas.map((item)=>{
                if(item.encomendaId==id){
                    item.status=2;
                }
            })
            if(status==2){
                swal("Sucesso!",res.data.message,"success");
            }else if(status==3){
                swal("Sucesso!","Encomenda entregue com sucesso!","success");
            }

        }else{
            console.log(res.data.data)
            swal("Ops!",res.data.message,"error");
        }
    });
}



  return (
    <div>
    <div className='m-3 row'>
        <h4>Detalhes da encomenda</h4>

        
            <ul className='nav justify-content-center ml-auto'>
                <li className='nav-item'>
                   {(encomenda.status===1)&&(<Link  to="/admin/produtos/encomendas/pendentes" className='nav-link btn btn-outline-secondary mr-2'  >Voltar</Link>)}
                   {(encomenda.status===2)&&(<Link  to="/admin/produtos/encomendas/finalizadas" className='nav-link btn btn-outline-secondary mr-2'  >Voltar</Link>)}
                   {(encomenda.status===3)&&(<Link  to="/admin/produtos/encomendas/entregues" className='nav-link btn btn-outline-secondary mr-2'  >Voltar</Link>)}

                    
                </li>
            </ul>
    </div>

    <div >

        <div className='mt-3'>
            <div>
                <h5>Produto por pesonalizar</h5>
                
                <div className="d-flex">

                    <div className="col-6 ">

                        <div className='form-group row ml-2 '>
                           
                       </div>

                       <div className='form-group row ml-2'>
                            <div className=''>
                                <img  className='box-upload-image' src={encomenda.imagem} alt="imagem do brinde" />
                            </div>
                        </div>
                       
                    </div>
                    <div className="col-6">
                    

                     <div className='form-group row ml-2 '>
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
                            
                            <div className={`box-upload   text-center `} >
                                    <div className=''>
                                        <img  className='box-upload-image'  src={encomenda.imagem_ass}  />
                                    </div>
                            </div>
                        </div>)}


                         
                    </div>
                </div>

            </div>

    
            <div>
                <h5>Dados do Cliente</h5>

                <strong>Nome :</strong> {encomenda.nome +" "+encomenda.apelido} <br/>
                <strong>Telefone :</strong> {encomenda.telefone} <br/>
                <strong>Email :</strong>  {encomenda.email}<br/>

                <div className="d-flex justify-content-end">
                   {(encomenda.status===1)&&(<button onClick={ (e) =>finalizarEncomenda(e,2)} className='btn bg-principal col-3'>Finalizar</button>)}
                   {(encomenda.status===2)&&(<button onClick={ (e)=> finalizarEncomenda(e,3)} className='btn bg-principal col-3'>Entregar</button>)}
                </div>
            </div>

        </div>  

    </div>


</div>
  )
}

export default encomendaDetalhes