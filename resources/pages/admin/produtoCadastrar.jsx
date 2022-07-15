import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';

import axios from 'axios';
import swal from 'sweetalert';



function produtoCadastrar() {
  const {id } = useParams();
  const[edit, setEdit]= useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  

    const [productInput, setProduct] = useState({
      categoria: '',
      nome: '',
      descricao: '',
      preco: '',
      imagem: '',
      error_list: [],
  });


  

useEffect(()=>{

  if(id){
    axios.get('/api/admin/produtos/'+id)
    .then((res) =>{
      if(res.data.status===200){
        
        let data=res.data.data
        console.log(data);
        setProduct({...productInput, nome: data.nome, preco: data.preco ,
          categoria: data.categoria, descricao: data.descricao, imagem: data.imagem, id: data.id });
          setEdit(true);
       
      }else if( res.data.status===404){
        console.log(res.data.data)
        setEdit(false);

      }
      
    })
  }
}, []);




const handleInput = (e) => {
  e.persist();
  setProduct({...productInput, [e.target.name]: e.target.value })
}

const savePrduct = (e) => {

  e.preventDefault();

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
  }
  let dataImage = new FormData();
    dataImage.append('file', selectedImage);

    axios.post('/api/admin/produtos/upload', dataImage, config)
    .then(function (res) {
       //console.log(res.data.success);
       //console.log(res.data.path);
      
       
       const data = {
        nome:productInput.nome,
        categoria:productInput.categoria,
        descricao:productInput.descricao,
        preco:productInput.preco,
        imagem: res.data.path
    }
    
  
    axios.post('/api/admin/produtos/salvar', data).then(res => {
  
      
      if(res.data.status === 200)
      {
          //console.log(res.data.imagem);
            console.log("Working");
  
          swal("Sucesso!",res.data.message,"success");
          setProduct({
              categoria: '',
              nome: '',
              descricao: '',
              preco: '',
              imagem: '',
              error_list: [],
            });

            setSelectedImage(null);
            //history.push('/students');
            
        }
        else if(res.data.status === 422)
        {
          console.log("Fails", res.data.validate_err);
          setProduct({...productInput, error_list: res.data.validate_err });
          
        }
      });
        
        })
      .catch(function (err) {
        console.log(err);
      });
}

const updateProduct = (e)=>{
  e.preventDefault();

    const data = {
      id:productInput.id,
      nome:productInput.nome,
      categoria:productInput.categoria,
      descricao:productInput.descricao,
      preco:productInput.preco,
   }


   axios.put('/api/admin/produtos/update', data).then(res => {
    if(res.data.status === 200)
    {
      //console.log(res.data.data)
      swal("Sucesso!",res.data.message,"success");
     
      setTimeout(()=>{
        window.location.reload(false);
      }, 1500)
     
    }
    else if(res.data.status === 422)
    {
      console.log(res.data.data)

    }
    else if(res.data.status === 404)
    {
      console.log(res.data.data)

    }
  });
}





  return (
    <div>
        <form onSubmit={savePrduct}  >
        <h4 className='mt-3'>Cadastrar brindes</h4>

        <div className="row" >

          
          <div className='col-6'>
             
                <div className='form-group row ml-2'>
                    <label htmlFor="categoria" className="col-md-4 col-form-label ">Tipo de artigo</label>
                    <div className="col-md-8">
                      <select className="form-control border-golden " id='categoria' name='categoria' onChange={handleInput} value={productInput.categoria}>
                              <option >Selecione a categoria do brinde</option>
                              <option value={"quadro"} >Quadro de pedra</option>
                              <option value={"chavena"}>Chávena</option>
                              <option value={"chaveiro"}>Chaveiro</option>
                              <option value={"bebedouro"}>Bebedouro</option>
                              <option value={"popsocket"}>Popsocket</option>
                         </select>
                    <span className="text-danger">{productInput.error_list.categoria}</span>

                    </div>
                </div>

                <div className='form-group row ml-2'>
                    <label htmlFor="nome" className="col-md-4 col-form-label ">Nome</label>
                    <div className="col-md-8">
                     <input className="form-control border-golden " type="text" id="nome" name="nome" onChange={handleInput} value={productInput.nome} 
                      placeholder="Digite o nome do brinde" />
                    <span className="text-danger">{productInput.error_list.nome}</span>
                    </div>
                </div>

                <div className='form-group row ml-2'>
                    <label htmlFor="descricao" className="col-md-4 col-form-label ">Descrição</label>
                    <div className="col-md-8">
                     <textarea className="form-control border-golden " name='descricao' id='descricao' onChange={handleInput} value={productInput.descricao}>

                     </textarea>
                    <span className="text-danger">{productInput.error_list.descricao}</span>

                     </div>
                </div>
               {/* <div className='form-group row  ml-2'>
                    <label htmlFor="preco" className="col-md-4 col-form-label ">Quantidade</label>
                    <div className="col-md-8">
                     <input className="form-control border-golden " type="number" id="quantidade" name="quantidade" onChange={handleInput} value={productInput.quantidade}
                      placeholder="Digite a quantidade" />
                    <span className="text-danger">{productInput.error_list.quantidade}</span>

                    </div>
                </div>*/}

                <div className='form-group row  ml-2'>
                    <label htmlFor="preco" className="col-md-4 col-form-label ">Preço</label>
                    <div className="col-md-8">
                     <input className="form-control border-golden " type="number" id="preco" name="preco" onChange={handleInput} value={productInput.preco}
                      placeholder="Digite o preço do brinde(Mts)" />
                    <span className="text-danger">{productInput.error_list.preco}</span>

                    </div>
                </div>
                
            
         </div>
          

            <div className='col-6 '>
              
                 {(!edit)?( <div className={`border-golden box-upload ${selectedImage && 'box-upload-image'}  ml-auto mr-3  text-center`} >
                      {selectedImage?(
                          <div className=''>
                               <img  className='box-upload-image'  src={URL.createObjectURL(selectedImage)} alt="imagem do brinde" />
                          </div>
                        ): (<div className='box-upload-text'>Nenhuma imagem selecionada</div>)}
                  </div>):

                  (<div className={`border-golden box-upload  ml-auto mr-3  text-center mb-3`} >
                      
                          <div className=''>
                               <img  className='box-upload-image'  src={productInput.imagem} alt="imagem do brinde" />
                          </div>
                        
                  </div>)}
                        
                  

                  {(!edit)&&(<div className=' mt-3'>
                    <label className="button offset-2" htmlFor="imagem">Selecione a imagem</label>
                    <input className='col-6 ml-auto' type="file"  name="imagem" id="imagem" accept="image/*" 
                    onChange={(event)=>{
                      //console.log(event.target.files[0].name);
                      setSelectedImage(event.target.files[0]);
        
                      //console.log(productInput.imagem)
  
                    }} />
                  </div>)}
                    <span className="text-danger  offset-2">{productInput.error_list.imagem}</span>
          
            </div>

        </div>

            {(!edit)?(<div className='row mt-3'>
                <button type='submit' className='btn bg-principal col-3  ml-auto mr-4' >Cadastrar</button>
            </div>):

            (<div className='row mt-5'>
                <button onClick={updateProduct} className='btn bg-principal col-3  ml-auto mr-4' >Actualizar</button>
            </div>)}
        </form>
        
    </div>
  )
}

export default produtoCadastrar


