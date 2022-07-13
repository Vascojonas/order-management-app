import React,{useState, useEffect} from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import {BsCartX,BsCartCheck, BsFillPencilFill} from 'react-icons/bs'
import { set } from 'lodash';
import AuthUser from '../../js/components/AuthUser';

import Mpesa from './mpesa.jpg'
import swal from 'sweetalert';
 

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
    const [compras, setCompras]= useState([])


    const halndleComrar = (e)=>{
       if(!compras.length==0){

           setComprar(!comprar);
    
           //console.log("compras");
           //console.log(compras);
       }else{
            swal("Ops","Nenhum item foi selecionado!", "error")
       }
       
    }
    
    let total=0;
    let total_compra=0;
    const encomendar = (e)=>{
        e.preventDefault();

        let data={
            from: pagamentoInput.numero,
            valor: total_compra
        }

        //console.log(data);
        axios.post('/carrinho/encomendar', data).then(res => {
          
            if(res.data.status === 200)
            {
                  //console.log(res.data);

                    compras.map((item)=>{
                         console.log(item);


                         const data = {
                            id: item.id,
                            user_id: user.id,
                            valor: item.preco,
                            quantidade: item.quantidade,
                            status: 1
                         }

                         axios.put('/encomenda/finalizar/compra', data).then(res => {
                            if(res.data.status==200){
                              console.log(res.data.data)
                              swal("Successo!",res.data.message,"success");
                            }else if(res.data.status==402){
                              swal("Ops!",res.data.message,"error");
                              console.log(res.data.data)
                            }else if(res.data.status==404){
                              swal("Ops!",res.data.message,"error");
                            }
                        })
                    })
                
                
                 //swal("Successo!",res.data.message,"success");

                  
              }
              else if(res.data.status === 422)
              {
                //console.log(res.data); 

                swal("Ops!","Ocorreu um erro durante o pagamento!", 'error');
              }
            }).catch((err)=>{
                //console.log(err);
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

    let count =0
    const handleCompras =(e, id)=>{

        setComprar(false);
        //console.log(id);
        let result;

        let element = document.getElementById('cb-'+id);

        carrinho.map((item)=>{

            if( element.checked ===true){
               
                axios.get(`/clientes/encomenda/itens/`+user.id+'-'+id).then(res=>{
          
                    if(res.data.status===200){

                        console.log(res.data.data)

                        if(res.data.data.status===1){
                            element.checked=false;
                            swal("Ops!", "Esse item já foi pago!","")
                            
                        }else{
                            let compraItem = [...compras];
                            let nova = (carrinho.filter((item)=> item.id == id))[0];
                            compraItem.push(nova);
                            setCompras(compraItem)
                           
                            ////console.log(compras);
                            count ++;
                           // //console.log(count);

                        }

                        
      
                    }else  if(res.data.status===404){
                    
                       ////console.log("Esta encomenda ainda não foi personalizada")
                       element.checked=false;
                       swal("Encomenda não personalizada!", "Clique na caneta para personalizar!", "error")
                       

                    }
                
                })  

                
            }else if(element.checked ===false){

                setCompras(compras.filter((item)=>
                    item.id !== id       
                 ))
            }
        })  
    }

    const updateQuantidade= (e, id)=>{
       
        let oldPrice;
        let newPrice;
        let newTotal;

        setComprar(false);
       
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
        ////console.log(total);


    }
    const deleteItemCarrinho= (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
  
        

       // //console.log(user.id);
        ////console.log(id);  

        let data ={
            user_id: user.id,
            produto: id
        }
        ////console.log(data);
        axios.delete('/carrinho/produtos/delete/'+data.user_id+'-'+data.produto).then(res=>{
            
            if(res.status === 200)
              { 
                ////console.log(res.data.data);
                setCarrinho(carrinho.filter((item)=>
                    item.id !== id       
                 ))
                 swal("Eliminado!",res.data.message,"success");
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
            
                          <input onChange={(e) => handleCompras(e, item.id)}  className=" btn btn-success big-checkbox mr-1" type="checkbox" value="" id={'cb-'+item.id}/>
                          <Link  to={'/encomendas/personalizar/'+item.id}  className="btn btn-sm btn-circle btn-outline-success mr-1"   title="Detalhes"><BsFillPencilFill/></Link>
                          <button  onClick={(e) => deleteItemCarrinho(e, item.id)} className="btn btn-sm btn-circle btn-outline-danger"   title="Remover"><BsCartX/></button>

                      </td>
                 </tr>
            ) 
            
       
        })

    const compras_html = compras.map((item, key)=>{
        total_compra += item.quantidade*item.preco;
        return(

            <tr key={key}>
                  <th scope="row" className=' list-img p-0'  >
                      <img className='list-img' src={item.imagem} style={{width: "60px", height:"60px"}} />
                  </th>
                  <td >
                    <input  readOnly type='number' min={0} className='form-control-file col-8' name='quantidade' value={item.quantidade} />
                  </td>
                  <td>{item.preco}</td>
                 
                <td id={`pt-${item.id}`}>
                    {item.preco*item.quantidade},00MT
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
                                
                                <td></td>
                                <th  colSpan={2}>Total no Carrinho</th>
                                <td id='center' align='' >{total},00MT</td>
                                {<td className='pr-0'> 
                                    <button onClick={halndleComrar} className='btn  bg-principal btn-block'>Comprar</button>
                                </td>}
                            
                                </tr>
  
                          </tfoot>
                          </table>
                  </div>

               {comprar&&(
                <div>
                        <div className='row col-6'>
                            <img src={Mpesa} className="mpesa"/>
                            <h4>Pagamentos por M-pesa</h4>
                        </div>
                     

                     
                         {message && <div className='col-6 p-3 text-danger'>{message}</div>}
                        <div className='d-flex justify-content-end'>
                            
                            <div className='form-group d-flex flex-column justify-content-start ml-2 col-6 '>
                                
                                    <div className="col-md-8">
                                        <input name='numero' className="form-control" type="number" placeholder="Digite o numero do telefone" 
                                        onChange={handleInput} value={pagamentoInput.numero} />
                                        <span className="text-danger">{pagamentoInput.error_list.numero}</span>
                                         <button onClick={encomendar} disabled={btnDisabled} className='btn bg-principal mt-3'>Encomendar</button>
                                    </div>
                            </div>

                            <div className='col-6'>
                            <table className="table table-striped">
                          <thead>
                              <tr>
                                      <th>Imagem</th>
                                      <th width='155'>Quantidade</th>
                                      <th width='155'>Preço Unitário</th>
                                      <th width='155'>Preço Total</th>
                              </tr>
                          </thead>
      
                          <tbody>
      
                            {compras_html}
                          
      
                          </tbody>

                          <tfoot>
                                <tr className=''>
                                
                                <td colSpan={2}></td>
                                <th>Total</th>
                                <td id='total_compra' >{total_compra},00MT</td>
                                
                                </tr>
  
                          </tfoot>
                          </table>
                            </div>
                            
                        </div>
                </div>)}

              </div>
          </div>
        )
    }

}

export default carinho