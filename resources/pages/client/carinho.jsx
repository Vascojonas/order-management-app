import React,{useState, useEffect} from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import {BsCartX,BsCartCheck, BsFillPencilFill} from 'react-icons/bs'
import { set } from 'lodash';
import AuthUser from '../../js/components/AuthUser';

import Mpesa from './mpesa.jpg'
 

function carinho() {
    const {getUser,getToken} = AuthUser();
    const [user, setUser] = useState(()=>{
      if(getUser()){
        return getUser();
      }else{
        return {role : '', id: ''}
      }
    });

    
    const [comprar, setComprar]= useState(false);

    const [message, setMessage]= useState(null);
    const [btnDisabled, setBtnDisabled]= useState(true)
    const [pagamentoInput, setPagamento]= useState({
        numero:'',
        valor:'',
        error_list:[]

    })

    const [carrinho, setCarrinho] =  useOutletContext();


    const halndleComrar = (e)=>{
        setComprar(!comprar);
    }
    
    let total=0;
    const encomendar = (e)=>{
        e.preventDefault();

        let data={
            from: pagamentoInput.numero,
            valor: total
        }

        console.log(data);
        axios.post('/carrinho/encomendar', data).then(res => {
          
            if(res.data.status === 200)
            {
                  console.log(res.data);
                  
                
                swal("Success!",res.data.message,"success");

                  
              }
              else if(res.data.status === 422)
              {
                console.log(res.data); 
              }
            }).catch((err)=>{
                console.log(err);
            });
    }

    const handleInput = (e) => {
        e.persist();
        setPagamento({...pagamentoInput, [e.target.name]: e.target.value })

        if(e.target.name==='numero'&& e.target.name===''){
            setMessage(null);
            setBtnDisabled(true)
        }else if(e.target.name==='numero'&& (e.target.value).length!==9){
            setMessage("Digite um número válido")
            setBtnDisabled(true)
        }else if(e.target.name==='numero'&& (e.target.value).length===9){
            setMessage(null)
            setBtnDisabled(false)
        }

    }

    const updateQuantidade= (e, id)=>{
       
        let oldPrice;
        let newPrice;
        let newTotal;


       
        carrinho.map((item)=>{
            
                if(item.id==id){
                    if(e.target.value===0){
                        e.target.value=1
                    }
                    oldPrice=item.quantidade*item.preco;
                    item.quantidade=e.target.value
                    newPrice=item.quantidade*item.preco;
                }
        })


        total = total - oldPrice + newPrice;
        setPagamento({...pagamentoInput, valor:total})
        document.getElementById('pt-'+id).innerHTML=newPrice +',00MT' 
        document.getElementById('total').innerHTML=total +',00MT' 
        console.log(total);


    }
    const deleteItemCarrinho= (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
  
        

        console.log(user.id);
        console.log(id);  

        let data ={
            user_id: user.id,
            produto: id
        }
        console.log(data);
        axios.delete('/carrinho/produtos/delete/'+data.user_id+'-'+data.produto).then(res=>{
            
            if(res.status === 200)
              { 
                console.log(res.data.data);
                setCarrinho(carrinho.filter((item)=>
                    item.id !== id       
                 ))
                 swal("Deleted!",res.data.message,"success");
                 thisClicked.closest("tr").remove()  
              }
          });

    }
    
    
    const carrinho_TABLE = carrinho.map((item, key)=>{
        total += item.quantidade*item.preco;
            return(

                <tr key={key}>
                      <th scope="row" className=' list-img p-0'>
                          <img className='list-img' src={item.imagem} />
                      </th>
                      <td >
                        <input onChange={(e)=> updateQuantidade(e, item.id)} type='number' min={0} className='form-control-file col-8' name='quantidade' value={item.quantidade} />
                      </td>
                      <td>{item.preco}</td>
                     
                    <td id={`pt-${item.id}`}>
                        {item.preco*item.quantidade},00MT
                    </td>
                     <td width="160">
            
                         {/* <input  className=" btn btn-success big-checkbox mr-1" type="checkbox" value="" id={'cb-'+item.id}/>*/}
                          <Link  to={'/encomendas/personalizar/'+item.id}  className="btn btn-sm btn-circle btn-outline-success mr-1"   title="Detalhes"><BsFillPencilFill/></Link>
                          <button  onClick={(e) => deleteItemCarrinho(e, item.id)} className="btn btn-sm btn-circle btn-outline-danger"   title="Remover"><BsCartX/></button>

                      </td>
                 </tr>
            ) 
            
       
        })
    


    if(carrinho.length==0){
        return(
            <div className='d-flex justify-content-center align-items-center  vazia '>
                <h4 className=''>Sem carrinho</h4>
            </div>
        );
    }else{

        return (
          <div>
             <h4>Meu carrinho</h4>
      
              <div className='conteudo mt-3 border-top'>
                  <div className='col-8 offset-2 mt-3'>
      
                          <table className="table table-striped">
                          <thead>
                              <tr>
                                      <th>Imagem</th>
                                      <th width='155'>Quantidade</th>
                                      <th width='155'>Preço Unitário</th>
                                      <th width='155'>Preço Total</th>
                                      <th></th>
                              </tr>
                          </thead>
      
                          <tbody>
      
                            {carrinho_TABLE}
                          
      
                          </tbody>

                          <tfoot>
                                <tr className=''>
                                
                                <td colSpan={2}></td>
                                <th>Total</th>
                                <td id='total' >{total},00MT</td>
                                {<td className='pr-0'> 
                                    <button onClick={halndleComrar} className='btn bg-principal btn-block'>Comprar</button>
                                </td>}
                            
                                </tr>
  
                          </tfoot>
                          </table>
                  </div>

               {comprar&&( <div>
                    <div className='row col-6 offset-6'>
                        <img src={Mpesa} className="mpesa"/>
                        <h4>Pagamentos por M-pesa</h4>
                    </div>
                     

                     
                         {message && <div className='col-6 offset-6 p-3 text-danger'>{message}</div>}
                        <div className='d-flex justify-content-end'>
                            
                            <div className='form-group d-flex ml-2 col-6 '>
                                
                                    <div className="col-md-8">
                                    <input name='numero' className="form-control" type="number" placeholder="Digite o numero do telefone" 
                                    onChange={handleInput} value={pagamentoInput.numero} />
                                    <span className="text-danger">{pagamentoInput.error_list.numero}</span>
                                    </div>
                                    <button onClick={encomendar} disabled={btnDisabled} className='btn bg-principal'>Encomendar</button>
                            </div>
                            
                        </div>
                </div>)}

              </div>
          </div>
        )
    }

}

export default carinho