import React, {useState,  useEffect} from 'react'
import { button, Link, useParams, useOutletContext } from 'react-router-dom';

function encomendaDetalhes() {


const {id} = useParams();
const [encomendas, setEncomendas] = useOutletContext();



let encomenda= encomendas.filter((item)=>
item.encomendaId==id
)






  return (
    <div>
    <div className='m-3 row'>
        < h4>Encomenda detalhes</h4>

        
            <ul className='nav justify-content-center ml-auto'>
                <li className='nav-item'>
                    <Link  to="/admin/produtos/encomendas" className='nav-link btn btn-outline-secondary mr-2'  >Voltar</Link>
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
                                <img  className='box-upload-image' src="/storage/uploads/1657707574_kit-3-quadros-decorativos-leao-colorido-kit-quadros-decorativos.jpg" alt="imagem do brinde" />
                            </div>
                        </div>
                       
                    </div>
                    <div className="col-6">
                    

                     <div className='form-group row ml-2 '>
                         <h5>Dados da personalização</h5>
                       </div>

                       <div className='form-group row ml-2 mt-3'>
                            <h6>Descrição</h6>
                            <p>
                                
                            </p> 
                        </div>

                        <div className='form-group row ml-2 mt-1 '>
                            
                            <div className={`box-upload   text-center `} >
                                    <div className=''>
                                        <img   src='...'  />
                                    </div>
                            </div>
                        </div>


                         
                    </div>
                </div>

            </div>

    
            <div>
                <h5>Dados do Cliente</h5>

                <strong>Nome :</strong> {encomenda.nome +" "+encomenda.apelido} <br/>
                <strong>Telefone :</strong> Vasco Jonas Mabui <br/>
                <strong>Email :</strong> Vasco Jonas Mabui <br/>

                <div className="d-flex justify-content-end">
                    <button className='btn bg-principal col-3'>Finalizar</button>
                </div>
            </div>

        </div>  

    </div>


</div>
  )
}

export default encomendaDetalhes