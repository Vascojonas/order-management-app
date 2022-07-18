import React,{useState, useEffect}  from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';
import { get, set } from 'lodash';
import Login from '../../js/components/login';
import {BsFillHeartFill,BsHeart,BsCartPlus,BsCartX,BsCartCheck} from 'react-icons/bs'

import swal from 'sweetalert';

import AuthUser from '../../js/components/AuthUser';
import { FaRegNewspaper } from 'react-icons/fa';
import axios from 'axios';



function main() {
    const {getUser,getToken} = AuthUser();
    const [user, setUser] = useState(()=>{
      if(getUser()){
        return getUser();
      }else{
        return {role : ''}
      }
    });

    const navigate = useNavigate();

    const [pesquisar, setPesquisar]=useState(false);
    const [resultadoPesquisa, setResultado]= useState([]);
    const [encontrado, setEncontrado] = useState(false);
    const [wish,setWish, carrinho, setCarrinho] =  useOutletContext();

     const [editPage,setEdit]=useState(false);
     const [bannerImage, setBannerImage] = useState(null);
     const [banners, setBanners]= useState([]);
      
    const [publicidadeInput, setPublicidade]= useState({
        titulo: '',
        descricao: '',
        quantidade: '',
        imagem:'',

        error_list: [],
    })


    const[compra, setCompra] = useState(false);

    let novaEncomenda;
    const [products, setproducts] = useState([]);

    const saveBanner = (e) => {

        e.preventDefault();
      
        const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
        }
        let dataImage = new FormData();
          dataImage.append('file', bannerImage);
      
          axios.post('/api/admin/produtos/upload', dataImage, config)
          .then(function (res) {
             ////console.log(res.data.success);
             ////console.log(res.data.path);
              
             const data = {
              titulo:publicidadeInput.titulo,
              descricao:publicidadeInput.descricao,
              imagem: res.data.path
             }
          
            //console.log(data);
          axios.post('/api/admin/banner/salvar', data).then(res => {
            if(res.data.status === 200)
            {
                swal("Sucesso!",res.data.message,"success");
                setPublicidade({
                    titulo: '',
                     descricao: '',
                     quantidade: '',

                     error_list: [],
                  });
      
                  setBannerImage(null);
                  //history.push('/students');
                  
              }
              else if(res.data.status === 422)
              {
                //console.log("Fails", res.data.validate_err);
                //setPublicidade({...publicidadeInput, error_list: res.data.validate_err });
              }
            });
              
              })
            .catch(function (err) {
              //console.log(err);
            });
      }

    const hadleEdit=()=>{
        setEdit(!editPage);
    }


    const handleCompra =(e)=>{
        const result = carrinho.find((item) => item.id == e.target.value);
       

        if(result){
            ////console.log("Encontrado")
        }else{
          
            let novoItem = [...carrinho];
            let nova = (products.filter((item)=> item.id == e.target.value))[0];
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

    const handleInput =(e)=>{
        e.persist();
        setPublicidade({...publicidadeInput, [e.target.name]: e.target.value })
    }

    const handleCarinho =(e)=>{
       
       const result = carrinho.find((item) => item.id == e.target.value);
       

        if(result){
            ////console.log("Encontrado")
        }else{
          
            let novoItem = [...carrinho];
            let nova = (products.filter((item)=> item.id == e.target.value))[0];
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

                                    swal("Sucesso!",presp.data.message,"success")

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

    const handleWish =(e)=>{
       
        const result = wish.find((item) => item.id == e.target.value);

 
         if(result){
             ////console.log("Encontrado")
         }else{
           
             let novoItem = [...wish];
             let nova = (products.filter((item)=> item.id == e.target.value))[0];
             novoItem.push(nova);
             setWish(novoItem)
         }
     
 
        
 
         if(!user.id){
             navigate('/login');
         }else{
 
             let data ={
                 id:user.id
               }
                 ////console.log(data);
             axios.get('/clientes/wish/'+data.id).then(res=>{
                 if(res.data.status === 200)
                 {     
                        // //console.log("Whish encontrado")
                        ////console.log(res.data)
                         let wish=res.data.data;
 
                         if(wish){
                            let data={
                                 produto_id: e.target.value,
                                 wish_id: wish.id
                            }
 
                            //console.log(data);
                            axios.post('/wish/produtos/salvar',data).then(presp=>{
                                 if(presp.data.status === 200)
                                 {
                                     ////console.log(presp.data.message);
 
                                     swal("Sucesso!",presp.data.message,"success")
 
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


    useEffect(() => {

        axios.get(`/api/admin/banners`).then(res=>{
            if(res.status === 200)
            {
                let data=res.data.publicidades;
                setBanners(data);
            }
        });
    },[]);

    useEffect(() => {

        axios.get(`/api/admin/produtos`).then(res=>{
            if(res.status === 200)
            {
                setproducts(res.data.products)
            }
        });
  
    }, []);


    let content_html =  products.map((item, key)=>{ 
        return (

             <div key={key} className=" artigo border-golden m-2 " >
                <img className='artigo-imagem' src={item.imagem} >

               </img>
               <div className=" artigo-conteudo">
                       <div className='artigo-action d-flex col-8 offset-2 ' >
                           <button value={item.id} onClick={handleWish}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
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


    let quadros_html =  products.map((item, key)=>{ 
        if(item.categoria==='quadro'){

            return (
    
                 <div key={key} className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleWish}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
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

        }
        
    })


    let chavenas_html =  products.map((item, key)=>{ 
        if(item.categoria==='chavena'){

            return (
    
                 <div key={key} className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleWish}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
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

        }
        
    })

    let bebedouros_html =  products.map((item, key)=>{ 
        if(item.categoria==='bebedouro'){

            return (
    
                 <div key={key} className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleWish}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
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

        }
        
    })

    let chaveiros_html =  products.map((item, key)=>{ 
        if(item.categoria==='chaveiro'){

            return (
    
                 <div key={key} className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleWish}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
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

        }
        
    })


    let vazia_html = ()=>{
        return(
            <div className="vazia">
                <div className="d-flex">
                    Nenhum resultado foi encontrado
                </div>
            </div>
        )
    }

    let pesquisa_html =  resultadoPesquisa.map((item, key)=>{ 
        return (

             <div key={key} className=" artigo border-golden m-2 " >
                <img className='artigo-imagem' src={item.imagem} >

               </img>
               <div className=" artigo-conteudo">
                       <div className='artigo-action d-flex col-8 offset-2 ' >
                           <button value={item.id} onClick={handleWish}  className='btn btn-outline-danger btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
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
   

    let countlist=0
    const banner_list = banners.map((item)=>{
        return(
         <li className={(countlist===0)&&'active'} data-target="#carouselExampleIndicators" data-slide-to={countlist++} ></li>
        )
    })
    
    let count=0;
        const banners_images = banners.map((item, key)=>{
            count++
            return (
                <div className={`carousel-item ${(count===1)&&'active'}`}>
                  <img id='b-'{...count} className="d-block w-100" src={item.imagem} />
                </div>
            )
                     
            
         })
    
    


    const  handlePesquisa=(e)=>{
        console.log(e.target.value);
        let value = e.target.value;

        if(value!==''){
            setPesquisar(true);
            axios.get('produtos/pesquisar/'+value)
            .then((res)=>{{
                if(res.data.status==200){
                    console.log(res.data.data);
                    setResultado(res.data.data);
                    setEncontrado(true)
                }else if(res.data.status==404){
                    setEncontrado(false)

                }
            }})

        }else{
            setPesquisar(false);
        }
    }

    const deleteBanner =(e, id)=>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deletar";

     
        ////console.log(data);
        axios.delete('/banner/delete/'+id).then(res=>{
            
            if(res.status === 200)
              { 
                ////console.log(res.data.data);
                setBanners(banners.filter((item)=>
                    item.id !== id       
                 ))
                 swal("Eliminado!",res.data.message,"success");
                 thisClicked.closest("tr").remove()  
              }
          });
  
    }

    const banner_edit = banners.map((item, key)=>{
            return(

                <tr key={key}>
                      <th scope="row" className=' list-img p-0'>
                          <img className='list-img' src={item.imagem} />
                      </th>
                      <td>{item.titulo}</td>                     
                     <td >
                          <button onClick={(e) => deleteBanner(e, item.id)}  className="btn btn-sm btn-circle btn-outline-danger"   title="Remover">Remover</button>
                      </td>
                 </tr>
            ) 
            
       
        })



    return (
      <>
      
    
      <div className=' container-fluid mt-5'>
    
         <div className='d-flex  input-group col-12 search p-0'>
              <div className=' col-6 p-0' >
                 <input className='form-control border-golden text-black' type="search" name="pesquisar" id="pesquisar"
                  placeholder="Pesquisar..." onChange={handlePesquisa} />
               </div>
               
          </div>


         {(pesquisar)?
              <div className=' container-fluid mt-5'>
                  <div className='row p-0 justify-content-start mt-4'>
                    {(encontrado)?
                        pesquisa_html
                    :
                        vazia_html
                    }

                      
                  </div>
              </div>
         :
            <>
            
                {(user.role=='admin'||user.role=='editor')&&(
                <div className=' d-flex justify-content-end mt-3'>
                    <button  onClick={hadleEdit} className="btn btn-sm btn-circle bg-principal  ml-1 mr-1" title="Editar">Banner <i className="fa fa-edit "></i></button>
                </div>
                )}
                  
                {(!editPage)&&(
                <div id="carouselExampleIndicators" className="carousel slide banner mt-3" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {banner_list}
                    </ol>
                    <div className="carousel-inner">
                        {banners_images}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Anterior</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Próximo</span>
                    </a>
                </div>
                )}
            
                {(editPage)&&(<div className=' mt-2  '>
            
                    <div id="carouselExampleIndicators" className=" carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        </ol>
                        <div className="carousel-inner banner ">
                            <div className="carousel-item active">
                                    <div className='banner-content'>
                                        <h3 id='p-titulo'  className='text-dark display-5'></h3>
            
                                        <p  id='p-descricao' className='text-dark '> 
                                           
                                        </p>
            
                                        
                            </div>
                                {bannerImage?(
                                    <div className='banner-image'>
                                        <img  className='d-block  w-100 banner-image'  src={URL.createObjectURL(bannerImage)} />
                                    </div>
                                    ): (<img className="d-block w-100 banner-image" id='banner2' src="..." alt=""/>)}
                                </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Anterior</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Próximo</span>
                        </a>
                    </div>
            
                    
                </div>)}
            
                {(editPage)&&
                (<div className='row mt-3'>
                <div className='col-6'>
                    <div className='form-group row  ml-2'>
                        <label htmlFor="preco" className="col-md-4 col-form-label ">Título</label>
                        <div className="col-md-8">
                        <input className="form-control border-golden " type="text" id="titulo" name="titulo" onChange={handleInput} value={publicidadeInput.titulo}
                            placeholder="Digite a titulo" />
                        <span className="text-danger"></span>
                        </div>
                    </div> 
                    <div className='form-group row ml-2'>
                        <label htmlFor="descricao" className="col-md-4 col-form-label ">Descrição</label>
                        <div className="col-md-8">
                        <textarea className="form-control border-golden " name='descricao' id='descricao' onChange={handleInput} value={publicidadeInput.descricao}>
                        </textarea>
                        <span className="text-danger"></span>
                        </div>
                    </div>
            
                    <div className='form-group row ml-2'>
                    <label className="col-md-4 col-form-label" htmlFor="imagem">Selecione a imagem</label>
                    <div className="col-md-8">
                        <input className='form-control border border-white' type="file"  name="imagem" id="imagem" accept="image/*" 
                            onChange={(event)=>{
                            ////console.log(event.target.files[0].name);
                            setBannerImage(event.target.files[0]);
                            setPublicidade({...publicidadeInput, [event.target.name]: event.target.value })
                            ////console.log(publicidadeInput.imagem)
            
                            }}  value={publicidadeInput.imagem}/>
                            <span className="text-danger  offset-2">{publicidadeInput.error_list.imagem}</span>
            
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                            <button disabled={!bannerImage} onClick={saveBanner} className='btn bg-principal'>Salvar</button>
                    </div>
                </div>
            
                <div className='col-6 banners-view'>
                <table className="table table-striped">
                          <thead>
                              <tr>
                                  <th>Imagem</th>
                                  <th>Titulo</th>
                                  <th ></th>
                              </tr>
                          </thead>
      
                          <tbody>
      
                            {banner_edit}
                          
      
                          </tbody>

                          </table>
            
                </div>
                </div>
                )} 
            
            
                <div className='row p-2 justify-content-between mt-4'>
                    {content_html}
                </div>
            
                <div className=' quadros mt-5'> 
                    <h4>Quadros</h4>
                    <div className='row justify-content-start artigos mt-4'>
                    {quadros_html}
                    </div>
                </div>
                        
                
                <div className=' quadros mt-5'> 
                    <h4>Chávenas</h4>
                    <div className='row justify-content-start artigos mt-4'>
                    {chavenas_html}
                    </div>
                </div>
                <div className=' quadros mt-5'> 
                    <h4>Bebedouros</h4>
                    <div className='row justify-content-start artigos mt-4'>
                    {bebedouros_html}
                    </div>
                </div>
                <div className=' quadros mt-5'> 
                    <h4>Chaveiros</h4>
                    <div className='row justify-content-start artigos mt-4'>
                    {chaveiros_html}
                    </div>
                </div>
            </>
         }
    
    
         
      </div>
    
    </>
    )

}

export default main
