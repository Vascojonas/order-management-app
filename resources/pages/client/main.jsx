import React,{useState, useEffect}  from 'react'
import { Link, useOutletContext } from 'react-router-dom';
import {IoSearch} from 'react-icons/io5';
import { get } from 'lodash';
import {BsInstagram, BsTwitter, BsWhatsapp, BsTelephoneOutboundFill,
    BsFillPersonFill, BsPlusCircle,BsCart3, BsCartPlus,BsCartX,BsCartCheck} from 'react-icons/bs'
 


function main() {
    const [encomendas, setEncomendas] = useOutletContext();
    let novaEncomenda;
    const [products, setproducts] = useState([]);

    const handleCompras =(e)=>{
       
        console.log("Comprar")
        console.log(e.target.value);
    }

    const handleCarinho =(e)=>{

        const result = encomendas.find((item) => item.id == e.target.value);
       

        if(result){
            //console.log("Encontrado")
        }else{
            novaEncomenda = [...encomendas];
            const nova = (products.filter((item)=> item.id == e.target.value))[0];
            nova.quantidade=1;
            novaEncomenda.push(nova);
            setEncomendas(novaEncomenda)
        }


    }

    useEffect(() => {

        axios.get(`/api/admin/produtos`).then(res=>{
            if(res.status === 200)
            {
                let i=1;
                let content=1;
                let copos=1;
                let quadros=1;
            
                res.data.products.map((item)=>{
                

                    if(i<=3){
                        document.getElementById(`banner${i}`).src=item.imagem
                        i++
                    }

                    if(i<=8){
                        document.getElementById(`artigo${content}`).src=item.imagem
                        document.getElementById(`descricao${content}`).innerHTML=item.descricao
                        document.getElementById(`preco${content}`).innerHTML=item.preco + ' MT'
                        document.getElementById(`comprar${content}`).value=item.id;
                        document.getElementById(`adcionar${content}`).value=item.id;
                        content++;
                    }

                    if(item.categoria=='copos'&& copos <=4){
                        document.getElementById(`copo${copos}`).src=item.imagem
                        document.getElementById(`descricao-c${copos}`).innerHTML=item.descricao
                        document.getElementById(`preco-c${copos}`).innerHTML=item.preco + ' MT'
                        document.getElementById(`comprar-c${copos}`).value=item.id
                        document.getElementById(`adcionar-c${copos}`).value=item.id

                        copos++;
                    }

                    if(item.categoria=='quadros'&& quadros <=4){
                        document.getElementById(`quadro${quadros}`).src=item.imagem
                        document.getElementById(`descricao-q${quadros}`).innerHTML=item.descricao
                        document.getElementById(`preco-q${quadros}`).innerHTML=item.preco + ' MT'
                        document.getElementById(`comprar-q${quadros}`).value= item.id
                        document.getElementById(`adcionar-q${quadros}`).value= item.id
                        quadros++;
                    }

                   
                })    

                setproducts(res.data.products)
                if(res.data.products !=''){
                    
                }
                
            }
        });
  
    }, []);





  return (
    <div className='mt-5'>
       <div className='d-flex justify-content-end input-group col-12 search'>
            <div className=' col-6 p-0' >
               <input className='form-control border-golden text-black' type="search" name="pesquisar" id="pesquisar"
                placeholder="Pesquisar..."/>
             </div>
              <button  className='btn bg-principal col-1'><IoSearch/></button>
      </div>

      <div className='banner  mt-2'>
        <div id="carouselExampleIndicators" className=" carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block  w-100" id='banner1' src="..." alt=""/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" id='banner2' src="..." alt=""/>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" id='banner3' src="..." alt=""/>
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
      </div>

      <div className='d-flex justify-content-between  artigos mt-4'>
        <div>
            <div className=" artigo border-golden " >
                <img className='artigo-imagem' src='..' id="artigo8" > 
                
                </img>
                <div className="artigo-conteudo">
                    <div id="descricao8">
                        <small>Copo de pega com fundo branco</small>
                    </div>
                    <div className='d-flex justify-content-between' >
                        <small id="preco8">250 MT</small>
                        <button onClick={handleCompras}  id="comprar8" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                        <button onClick={handleCarinho} id="adcionar8" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/> </button>
                    </div>
                </div>
            </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
                <img className='artigo-imagem' src='..' id="artigo1" >

                </img>
                <div className=" artigo-conteudo">
                    <div id="descricao1">
                        <small>Copo de pega com fundo branco</small>
                    </div>
                   
                    <div className='d-flex justify-content-between' >
                        <small id="preco1">250 MT</small>
                            <button onClick={handleCompras}  id="comprar1" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar1" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                     </div>
                 
                </div>
            </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="artigo2" >

                </img>
                <div className=" artigo-conteudo">
                    <div id="descricao2">
                        <small>Copo de pega com fundo branco</small>
                    </div>
                    
                        <div className='d-flex justify-content-between' >
                            <small id="preco2">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar2" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar2" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                    
                </div>
            </div>
        </div>

        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="artigo3" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao3">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                        <div className='d-flex justify-content-between' >
                            <small id="preco3">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar3" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar3" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
            
            </div>
            </div>
        </div>
       
       
        
      </div>

      <div className='d-flex justify-content-between  artigos mt-4'>
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="artigo4" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao4">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                         <div className='d-flex justify-content-between' >
                            <small id="preco4">250 MT</small>
                            <button onClick={handleCompras}  id="comprar4" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar4" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="artigo5" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao5">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                    <div className='d-flex justify-content-between' >
                            <small id="preco5">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar5" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar5" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
                
            </div>
            </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="artigo6" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao6">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                        <div className='d-flex justify-content-between' >
                            <small id="preco6">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar6" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar6" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
        </div>

        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="artigo7" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao7">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                     <div className='d-flex justify-content-between' >
                            <small id="preco7">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar7" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar7" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
              
            </div>
            </div>
        </div>
       
      </div>
      <div className='d-flex justify-content-end mt-2'>
           <button className='btn bg bg-principal'>Ver mais...</button>
      </div>
        
       <div className='copos mt-5'> 
            <h4>Copos</h4>
            <div className='d-flex justify-content-between  artigos mt-4'>
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="copo1" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao-c1">
                    <small>Copo de pega com fundo branco</small>
                </div>
            
                        <div className='d-flex justify-content-between' >
                            <small id="preco-c1">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-c1" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-c1" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="copo2" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao-c2">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                        <div className='d-flex justify-content-between' >
                            <small id="preco-c2">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-c2" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-c2" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
            
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="copo3" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao-c3">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                        <div className='d-flex justify-content-between' >
                            <small id="preco-c3">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-c3" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-c3" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>

            </div>
        </div>

        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="copo4" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao-c4">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                        <div className='d-flex justify-content-between' >
                            <small id="preco-c4">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-c4" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-c4" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
        </div>
       
       
        
      </div>
       </div>
       <div className='d-flex justify-content-end mt-2'>
           <button className='btn bg bg-principal'>Ver mais...</button>
      </div>

       <div className='quadros mt-5'> 
            <h4>Quadros</h4>
            <div className='d-flex justify-content-between  artigos mt-4'>
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="quadro1" >

                </img>
                <div className=" artigo-conteudo">
                    <div id="descricao-q1">
                        <small>Copo de pega com fundo branco</small>
                    </div>
                    
                        <div className='d-flex justify-content-between' >
                            <small id="preco-q1">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-q1" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-q1" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                    
                </div>
                </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="quadro2" >

                </img>
                <div className=" artigo-conteudo">
                    <div id="descricao-q2">
                        <small>Copo de pega com fundo branco</small>
                    </div>
                    
                    <div className='d-flex justify-content-between' >
                            <small id="preco-q2">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-q2" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-q2" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
                </div>
                </div>
        </div>
       
        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="quadro3" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao-q3">
                    <small>Copo de pega com fundo branco</small>
                </div>
            
                      <div className='d-flex justify-content-between' >
                            <small id="preco-q3">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-q3" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-q3" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
        </div>

        <div>
            <div className=" artigo border-golden " >
            <img className='artigo-imagem' src='..' id="quadro4" >

            </img>
            <div className=" artigo-conteudo">
                <div id="descricao-q4">
                    <small>Copo de pega com fundo branco</small>
                </div>
                
                        <div className='d-flex justify-content-between' >
                            <small id="preco-q4">250 MT</small>
                            <button value=""onClick={handleCompras}  id="comprar-q4" className='btn bg-principal btn-sm  btn-carrinho ml-auto mr-1'> Comprar</button>
                            <button onClick={handleCarinho} id="adcionar-q4" className='btn bg-principal btn-sm  btn-carrinho'> <BsCartPlus/></button>
                         </div>
                
            </div>
            </div>
        </div>
       
       
        
      </div>
       </div>
      
        <div className='d-flex justify-content-end mt-2'>
           <button className='btn bg bg-principal'>Ver mais...</button>
      </div>
    </div>
  )
}

export default main
