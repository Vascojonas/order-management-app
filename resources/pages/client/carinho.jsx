import React,{useState} from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import {BsCartX,BsCartCheck} from 'react-icons/bs'
import { set } from 'lodash';
 

function carinho() {

    const [encomendas, setEncomendas] = useOutletContext();
    
    let total=0;

    const updateQuantidade= (e, id)=>{
       
        let oldPrice;
        let newPrice;
        let newTotal;
       
        encomendas.map((item)=>{
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
        document.getElementById('pt-'+id).innerHTML=newPrice +',00MT' 
        document.getElementById('total').innerHTML=total +',00MT' 
        console.log(total);


    }
    const deleteEncomenda= (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        
        

        setEncomendas(encomendas.filter((item)=>
             item.id !== id       
         ))
       // swal("Deleted!",res.data.message,"success");
        //thisClicked.closest("tr").remove()   


    }
    
    
    const ENCOMENDAS_TABLE = encomendas.map((item, key)=>{

        total += item.quantidade*item.preco;
            return(

                <tr key={key}>
                      <th scope="row" className=' list-img p-0'>
                          <img className='list-img' src={item.imagem} />
                      </th>
                      <td >
                        <input onChange={(e)=> updateQuantidade(e, item.id)} type='number' min={0} className='form-control-file col-8' name='quantidade' />
                      </td>
                      <td>{item.preco}</td>
                     
                    <td id={`pt-${item.id}`}>
                        {item.preco*item.quantidade},00MT
                    </td>
                     <td width="">
                      <button  onClick={(e) => deleteEncomenda(e, item.id)} className="btn btn-sm btn-circle btn-outline-danger"   title="Remover"><BsCartX/></button>
                      </td>
                 </tr>
            )               
        })
    


    if(encomendas.length==0){
        return(
            <div className='d-flex justify-content-center align-items-center  vazia '>
                <h4 className=''>Sem encomendas</h4>
            </div>
        );
    }else{

        return (
          <div>
             <h4>Minhas encomendas</h4>
      
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
      
                            {ENCOMENDAS_TABLE}
                          
      
                          </tbody>

                          <tfoot>
                                <tr className=''>
                                
                                <td colSpan={2}></td>
                                <th>Total</th>
                                <td id='total' >{total},00MT</td>
                                <td className='pr-0'> 
                                    <button className='btn bg-principal btn-block'>Comprar</button>
                                </td>
                            
                                </tr>
  
                          </tfoot>
                          </table>
                  </div>
              </div>
          </div>
        )
    }

}

export default carinho