import React,{useState, useEffect}  from 'react'
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';
import { get, set } from 'lodash';
import Login from '../../js/components/login';
import {BsFillHeartFill,BsHeart,BsCartPlus,BsCartX,BsCartCheck} from 'react-icons/bs'

import swal from 'sweetalert';

import AuthUser from '../../js/components/AuthUser';
import { FaRegNewspaper } from 'react-icons/fa';



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

    const [mainContent, setMainContent]= useState([]);
    const [carrinho, setCarrinho] =  useOutletContext();

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
             //console.log(res.data.success);
             //console.log(res.data.path);
              
             const data = {
              titulo:publicidadeInput.titulo,
              descricao:publicidadeInput.descricao,
              imagem: res.data.path
             }
          
            console.log(data);
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
                console.log("Fails", res.data.validate_err);
                //setPublicidade({...publicidadeInput, error_list: res.data.validate_err });
              }
            });
              
              })
            .catch(function (err) {
              console.log(err);
            });
      }

    const hadleEdit=()=>{
        setEdit(!editPage);
    }


    const handleCompra =(e)=>{
        novaEncomenda = [];
        const nova = (products.filter((item)=> item.id == e.target.value))[0];
        nova.quantidade=1;
        novaEncomenda.push(nova);
        setEncomendas(novaEncomenda)
        navigate('/encomendas/carinho');
    }

    const handleInput =(e)=>{
        e.persist();
        setPublicidade({...publicidadeInput, [e.target.name]: e.target.value })
    }

    const handleCarinho =(e)=>{
       
       const result = carrinho.find((item) => item.id == e.target.value);
       

        if(result){
            //console.log("Encontrado")
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
                //console.log(data);
            axios.get('/clientes/carrinho/'+data.id).then(res=>{
                if(res.data.status === 200)
                {     
                       // console.log("Carrinho encontrado")
                       //console.log(res.data)
                        let carrinho=res.data.data;

                        if(carrinho){
                           let data={
                                produto_id: e.target.value,
                                carrinho_id: carrinho.id
                           }

                           console.log(data);
                           axios.post('/carrinho/produtos/salvar',data).then(presp=>{
                                if(presp.data.status === 200)
                                {
                                    //console.log(presp.data.message);

                                    swal("Sucesso!",presp.data.message,"success")

                                }
                                else if(presp.data.status === 405)
                                {
                                    console.log(presp.data.message);
                                    swal("Ops!",presp.data.message,"error")

                                }
                           })

                        }else{
                            console.log("existe")

                        }
                }
                else if(res.data.status === 404)
                {

                    console.log(res.data.data)
                    
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


    let content_html =  products.map((item)=>{ 
        return (

             <div className=" artigo border-golden m-2 " >
                <img className='artigo-imagem' src={item.imagem} >

               </img>
               <div className=" artigo-conteudo">
                       <div className='artigo-action d-flex col-8 offset-2 ' >
                           <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
                           <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsCartPlus/></button>
                           <button value={item.id} onClick={handleCompra}   className='btn bg-principal btn-sm  btn-carrinho '> Comprar</button>
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

    let quadros_html =  products.map((item)=>{ 
        if(item.categoria==='quadro'){

            return (
    
                 <div className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsCartPlus/></button>
                               <button value={item.id} onClick={handleCompra}   className='btn bg-principal btn-sm  btn-carrinho '> Comprar</button>
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


    let chavenas_html =  products.map((item)=>{ 
        if(item.categoria==='chavena'){

            return (
    
                 <div className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsCartPlus/></button>
                               <button value={item.id} onClick={handleCompra}   className='btn bg-principal btn-sm  btn-carrinho '> Comprar</button>
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

    let bebedouros_html =  products.map((item)=>{ 
        if(item.categoria==='bebedouro'){

            return (
    
                 <div className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsCartPlus/></button>
                               <button value={item.id} onClick={handleCompra}   className='btn bg-principal btn-sm  btn-carrinho '> Comprar</button>
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

    let chaveiros_html =  products.map((item)=>{ 
        if(item.categoria==='chaveiro'){

            return (
    
                 <div className=" artigo border-golden m-2 " >
                    <img className='artigo-imagem' src={item.imagem} >
    
                   </img>
                   <div className=" artigo-conteudo">
                           <div className='artigo-action d-flex col-8 offset-2 ' >
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsHeart/></button>
                               <button value={item.id} onClick={handleCarinho}  className='btn bg-principal btn-sm  btn-carrinho mr-1'> <BsCartPlus/></button>
                               <button value={item.id} onClick={handleCompra}   className='btn bg-principal btn-sm  btn-carrinho '> Comprar</button>
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

   

    var banners_images =" "

    let first=true;
    banners_images =
          banners.map((item, key)=>{
            
            return(
                    <div key={key} className= {`carousel-item ${first&&'active'}`}>

                        <div className='banner-image'>
                             <img  className='d-block  w-100 banner-image'  src={item.imagem} />
                        </div> 
                         
                     </div>   
                );  
                first=false;
              })

    var banner_list=""

    let i=0;
    
    banner_list = banners.map((item, key)=>{
                    return(
                    <li key={key} data-target="#carouselExampleIndicators" data-slide-to={i} className="active"></li>
                   )
                   i++;
                })
           



  return (
    <>
    

    <div className=' container-fluid mt-5'>

       <div className='d-flex  input-group col-12 search p-0'>
            <div className=' col-6 p-0' >
               <input className='form-control border-golden text-black' type="search" name="pesquisar" id="pesquisar"
                placeholder="Pesquisar..."/>
             </div>
              <button  className='btn bg-principal col-1'><IoSearch/></button>
        </div>

       {(user.role=='admin'||user.role=='editor')&&(
        <div className=' d-flex justify-content-end mt-3'>
            <button  onClick={hadleEdit} className="btn btn-sm btn-circle bg-principal  ml-1 mr-1" title="Editar">Banner <i className="fa fa-edit "></i></button>
        </div>
      )}


    
      {(!editPage)&&(
      <div className='banner  mt-2'>
              <div id="carouselExampleIndicators" className=" carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {banner_list}
                </ol>
                <div className="carousel-inner banner ">
                  
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
      </div>)}

      {(editPage)&&(<div className=' mt-2  '>

             <div id="carouselExampleIndicators" className=" carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                </ol>
                <div className="carousel-inner banner ">
                    <div className="carousel-item active">
                            <div className='banner-content'>
                                <h3 id='p-titulo'  className='text-dark display-5'>{publicidadeInput.titulo}</h3>

                                <p  id='p-descricao' className='text-dark '> 
                                  {publicidadeInput.descricao}
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
                    //console.log(event.target.files[0].name);
                    setBannerImage(event.target.files[0]);
                    setPublicidade({...publicidadeInput, [event.target.name]: event.target.value })
                    //console.log(publicidadeInput.imagem)

                    }}  value={publicidadeInput.imagem}/>
                     <span className="text-danger  offset-2">{publicidadeInput.error_list.imagem}</span>

                </div>
            </div>
            <div className='d-flex justify-content-end'>
                   <button disabled={!bannerImage} onClick={saveBanner} className='btn bg-principal'>Salvar</button>
             </div>
        </div>

        <div className='col-6 banners-view'>

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

       
    </div>

  </>
  )
}

export default main
