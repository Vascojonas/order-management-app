import React, { useState } from 'react'

function produtoCadastrar() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  var loadFile = function(event, id) {
    alert("Voce chegou aqui")
    var img = document.getElementById(id);
    img.src = URL.createObjectURL(event.target.files[0]);
  	 img.style.width='310px'
     img.onload = function() {
      URL.revokeObjectURL(img.src) // free memory
    }
  };


  return (
    <div>
        <h4 className='mt-3'>Cadastrar Produtos</h4>

        <div className="row" >


          <div className='col-6'>
             
                <div className='form-group row ml-2'>
                    <label for="categoria" className="col-md-4 col-form-label bg-sinza">Categoria</label>
                    <div className="col-md-8">
                      <select className="form-control border border-secondary " id='categoria' name='categoria'>
                              <option >Selecione a categoria do produto</option>
                              <option >Categoria 1</option>
                         </select>
                    </div>
                </div>

                <div className='form-group row ml-2'>
                    <label for="nome" className="col-md-4 col-form-label bg-sinza">Nome</label>
                    <div className="col-md-8">
                     <input className="form-control border border-secondary " type="text" id="nome" name="nome" 
                      placeholder="Digite o nome do produto" />
                    </div>
                </div>

                <div className='form-group row ml-2'>
                    <label for="descricao" className="col-md-4 col-form-label bg-sinza">Descrição</label>
                    <div className="col-md-8">
                     <textarea className="form-control border border-secondary " name='descricao' id='descricao'>

                     </textarea>
                     </div>
                </div>

                <div className='form-group row  ml-2'>
                    <label for="preco" className="col-md-4 col-form-label bg-sinza">Preço</label>
                    <div className="col-md-8">
                     <input className="form-control border border-secondary " type="number" id="preco" name="preco" 
                      placeholder="Digite o preço do produto (Mts)" />
                    </div>
                </div>
            
         </div>
          

            <div className='col-6 '>
              <form>
                  <div className='border border-secondary box-upload ml-auto mr-3  text-center'>
                      {selectedImage?(
                          <div>
                          <img  className='box-upload' src={URL.createObjectURL(selectedImage)} />
                          </div>
                        ): (<div className='box-upload-text'>Nenhuma imagem selecionada</div>)}
                  </div>
              

                  <div className=' mt-3'>
                    <label className="button offset-2" for="myImage">Selecione a imagem</label>
                    <input className='col-6 ml-auto' type="file"  name="myImage" id="myImage" accept="image/*" 
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                    }} />
    
                  </div>
              </form>
            </div>

        </div>

            <div className='row mt-3'>
                <button className='btn bg-principal col-3  ml-auto mr-4' >Cadastrar</button>
            </div>
        
    </div>
  )
}

export default produtoCadastrar


