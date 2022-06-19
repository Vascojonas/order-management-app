import React, { useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

function produtoCadastrar() {

  const[editProduct, setEditProduct]= useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

    const [productInput, setProduct] = useState({
      categoria: '',
      nome: '',
      descricao: '',
      quantidade: '',
      preco: '',
      imagem: '',
      error_list: [],
  });

  if(editProduct){
    
  }

  

const handleInput = (e) => {
  e.persist();
  setProduct({...productInput, [e.target.name]: e.target.value })
}

const savePrduct = (e) => {

  e.preventDefault();
  
  const data = {
      nome:productInput.nome,
      categoria:productInput.categoria,
      descricao:productInput.descricao,
      quantidade:productInput.quantidade,
      preco:productInput.preco,
      imagem:productInput.imagem,

  }
  
  axios.post('/api/admin/produtos/salvar', data).then(res => {

    
    if(res.data.status === 200)
    {
        console.log(res.data.erro);
          console.log("Working");

        swal("Success!",res.data.message,"success");
        setProduct({
            categoria: '',
            nome: '',
            descricao: '',
            quantidade: '',
            preco: '',
            imagem: '',
            error_list: [],
          });
          //history.push('/students');
          
      }
      else if(res.data.status === 422)
      {
        console.log("Fails", res.data.validate_err);
        setProduct({...productInput, error_list: res.data.validate_err });
      }
  });
}






  return (
    <div>
        <form onSubmit={savePrduct}>
        <h4 className='mt-3'>Cadastrar brindes</h4>

        <div className="row" >

          
          <div className='col-6'>
             
                <div className='form-group row ml-2'>
                    <label htmlFor="categoria" className="col-md-4 col-form-label bg-sinza">Tipo de artigo</label>
                    <div className="col-md-8">
                      <select className="form-control border border-secondary " id='categoria' name='categoria' onChange={handleInput} value={productInput.categoria}>
                              <option >Selecione a categoria do brinde</option>
                              <option >Categoria 1</option>
                         </select>
                    <span className="text-danger">{productInput.error_list.categoria}</span>

                    </div>
                </div>

                <div className='form-group row ml-2'>
                    <label htmlFor="nome" className="col-md-4 col-form-label bg-sinza">Nome</label>
                    <div className="col-md-8">
                     <input className="form-control border border-secondary " type="text" id="nome" name="nome" onChange={handleInput} value={productInput.nome} 
                      placeholder="Digite o nome do brinde" />
                    <span className="text-danger">{productInput.error_list.nome}</span>
                    </div>
                </div>

                <div className='form-group row ml-2'>
                    <label htmlFor="descricao" className="col-md-4 col-form-label bg-sinza">Descrição</label>
                    <div className="col-md-8">
                     <textarea className="form-control border border-secondary " name='descricao' id='descricao' onChange={handleInput} value={productInput.descricao}>

                     </textarea>
                    <span className="text-danger">{productInput.error_list.descricao}</span>

                     </div>
                </div>
                <div className='form-group row  ml-2'>
                    <label htmlFor="preco" className="col-md-4 col-form-label bg-sinza">Quantidade</label>
                    <div className="col-md-8">
                     <input className="form-control border border-secondary " type="number" id="quantidade" name="quantidade" onChange={handleInput} value={productInput.quantidade}
                      placeholder="Digite a quantidade" />
                    <span className="text-danger">{productInput.error_list.quantidade}</span>

                    </div>
                </div>

                <div className='form-group row  ml-2'>
                    <label htmlFor="preco" className="col-md-4 col-form-label bg-sinza">Preço</label>
                    <div className="col-md-8">
                     <input className="form-control border border-secondary " type="number" id="preco" name="preco" onChange={handleInput} value={productInput.preco}
                      placeholder="Digite o preço do brinde(Mts)" />
                    <span className="text-danger">{productInput.error_list.preco}</span>

                    </div>
                </div>
                
            
         </div>
          

            <div className='col-6 '>
              
                  <div className={`border border-secondary box-upload ${selectedImage && 'box-upload-image'}  ml-auto mr-3  text-center`} >
                      {selectedImage?(
                          <div className=''>
                          <img  className='box-upload-image'  src={URL.createObjectURL(selectedImage)} alt="imagem do brinde" />
                          </div>
                        ): (<div className='box-upload-text'>Nenhuma imagem selecionada</div>)}
                  </div>
              

                  <div className=' mt-3'>
                    <label className="button offset-2" for="imagem">Selecione a imagem</label>
                    <input className='col-6 ml-auto' type="file"  name="imagem" id="imagem" accept="image/*" 
                    onChange={(event)=>{
                      //console.log(event.target.files[0].name);
                      setSelectedImage(event.target.files[0]);
              
                     setProduct({...productInput, [event.target.name]: event.target.value })
                      console.log(productInput.imagem)
                    }}  value={productInput.imagem}/>
                  </div>
                    <span className="text-danger  offset-2">{productInput.error_list.imagem}</span>
          
            </div>

        </div>

            <div className='row mt-3'>
                <button type='submit' className='btn bg-principal col-3  ml-auto mr-4' >Cadastrar</button>
            </div>
        </form>
        
    </div>
  )
}

export default produtoCadastrar


