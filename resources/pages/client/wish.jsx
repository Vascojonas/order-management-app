import React,{useState,} from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { set } from 'lodash';
import AuthUser from '../../js/components/AuthUser';
import {BsFillHeartFill,BsHeart,BsCartPlus,BsCartX,BsCartCheck} from 'react-icons/bs'

import swal from 'sweetalert';
 

function wish() {
    const navigate = useNavigate();
    const {getUser,getToken} = AuthUser();
    const [user, setUser] = useState(()=>{
      if(getUser()){
        return getUser();
      }else{
        return {role : '', id: ''}
      }
    });



    const [wish,setWish, carrinho, setCarrinho] =  useOutletContext();


    const handleCarinho =(e)=>{
       
        const result = carrinho.find((item) => item.id == e.target.value);
        
 
         if(result){
             ////console.log("Encontrado")
         }else{
           
             let novoItem = [...carrinho];
             let nova = (wish.filter((item)=> item.id == e.target.value))[0];
             novoItem.push(nova);
             setCarrinho(novoItem)
         }
     
 
        
 
         if(!user.id){
             navigate('/login');
         }else{
 
             let data ={
                 id:user.id
               }
                 ////console.log(data);
             axios.get('/clientes/carrinho/'+data.id).then(res=>{
                 if(res.data.status === 200)
                 {     
                        // //console.log("Carrinho encontrado")
                        ////console.log(res.data)
                         let carrinho=res.data.data;
 
                         if(carrinho){
                            let data={
                                 produto_id: e.target.value,
                                 carrinho_id: carrinho.id
                            }
 
                            //console.log(data);
                            axios.post('/carrinho/produtos/salvar',data).then(presp=>{
                                 if(presp.data.status === 200)
                                 {
                                     ////console.log(presp.data.message);
 
                                     swal(presp.data.message, "","success")
 
                                 }
                                 else if(presp.data.status === 405)
                                 {
                                     //console.log(presp.data.message);
                                     swal("Ops!",presp.data.message,"error")
 
                                 }
                            })
 
                         }else{
                             //console.log("existe")
 
                         }
                 }
                 else if(res.data.status === 404)
                 {
 
                     //console.log(res.data.data)
                     
                 }
         
             });
         }
 
 
 
 
     }

     const handleCompra =(e)=>{
        const result = carrinho.find((item) => item.id == e.target.value);
       

        if(result){
            ////console.log("Encontrado")
        }else{
          
            let novoItem = [...carrinho];
            let nova = (whish.filter((item)=> item.id == e.target.value))[0];
            novoItem.push(nova);
            setCarrinho(novoItem)
        }


        if(!user.id){
            navigate('/login');
        }else{

            let data ={
                id:user.id
              }
                ////console.log(data);
            axios.get('/clientes/carrinho/'+data.id).then(res=>{
                if(res.data.status === 200)
                {     
                       // //console.log("Carrinho encontrado")
                       ////console.log(res.data)
                        let carrinho=res.data.data;

                        if(carrinho){
                           let data={
                                produto_id: e.target.value,
                                carrinho_id: carrinho.id
                           }

                           //console.log(data);
                           axios.post('/carrinho/produtos/salvar',data).then(presp=>{
                                if(presp.data.status === 200)
                                {
                                    ////console.log(presp.data.message);

                                    navigate('/cliente/carinho');

                                }
                                else if(presp.data.status === 405)
                                {
                                    ////console.log(presp.data.message);
                                    navigate('/cliente/carinho');

                                }
                           })

                        }else{
                            //console.log("existe")

                        }
                }
                else if(res.data.status === 404)
                {

                    //console.log(res.data.data)
                    
                }
        
            });
        }

    }
 

    const deleteItemWish= (e,id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;

        let data ={
            user_id: user.id,
            produto: id
        }
        ////console.log(data);
        axios.delete('/wish/produtos/delete/'+data.user_id+'-'+data.produto).then(res=>{
            
            if(res.status === 200)
              { 
                ////console.log(res.data.data);
                setWish(wish.filter((item)=>
                    item.id !== id       
                 ))
                 swal("Artigo removido dos favoritos"," ","success");
                 thisClicked.closest("tr").remove()  
              }
          });

    }
    
    
    const wish_TABLE = wish.map((item, key)=>{ 
        return (

             <div key={key} className=" artigo border-golden m-2 " >
                <img className='artigo-imagem' src={item.imagem} >

               </img>
               <div className=" artigo-conteudo">
                       <div className='artigo-action d-flex col-8 offset-2 ' >
                           <button value={item.id} onClick={(e) => deleteItemWish(e, item.id)}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsFillHeartFill/></button>
                           <button value={item.id} onClick={handleCarinho}  className='btn btn-outline-success btn-sm  btn-carrinho mr-1'> <BsCartPlus/></button>
                           <button value={item.id} onClick={handleCompra}   className='btn btn-outline-secondary btn-sm  btn-carrinho '> Comprar</button>
                        </div>
                   <div className='artigo-textos' >
                       <small><strong>{item.nome}</strong></small><br/>
                       <small>{item.descricao}</small> 
                       <small > <strong>{item.preco} MT</strong></small>

                   </div>
    
               </div>
              </div>
             
       )
    })





    if(wish.length==0){
        return(
            <div className='d-flex justify-content-center align-items-center  vazia '>
                <h4 className=''>Lista de  favoritos vazia</h4>
            </div>
        );
    }else{

        return (
          <div className='mt-5'>
             <h4>Favoritos</h4>
      
              <div className='container-fluid mt-5'>
                  <div className='row p-0 justify-content-start mt-4'>
      
                        
      
                            {wish_TABLE}
                          
      
                
                  </div>
              </div>
          </div>
        )
    }

}

export default wish