import React, {useState} from 'react'

function personalizarEncomenda() {
    
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

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value })
    }
      
  

  return (
    <div className='mt-3' >
        <h4>Personalizar Encomenda</h4>

       <div className='conteudo mt-3 border-top'>
        <div className='col-8 offset-2 mt-3'>
                
                <div className='form-group row ml-2 '>
                    <label htmlFor="categoria" className="col-md-4 col-form-label ">Tipo de artigo</label>
                    <div className="col-md-8">
                    <select className="form-control border-golden " id='categoria' name='categoria' onChange={handleInput} value={productInput.categoria}>
                            <option >Selecione da encomenda</option>
                            <option value={"quadros"} >Quadro</option>
                            <option value={"copos"}>Copo</option>
                            <option value={"chaveiros"}>Chaveiro</option>
                        </select>
                    <span className="text-danger">{productInput.error_list.categoria}</span>

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

                
                
                <div className='d-flex pl-3'>
                    <div className=' border-top col-4'>
                        <label>Faça upload do artigo por costumizar</label>
                        <input className='border' type="file"  name="imagem" id="imagem" accept="image/*" 
                        onChange={(event)=>{
                        //console.log(event.target.files[0].name);
                        setSelectedImage(event.target.files[0]);
                        setProduct({...productInput, [event.target.name]: event.target.value })
                        //console.log(productInput.imagem)
    
                        }}  value={productInput.imagem}/>
                        <span className="text-danger ">{productInput.error_list.imagem}</span>
                    </div>


                    <div className={` box-upload ${selectedImage && 'box-upload-image-cliente'} col-8 border-golden ml-2  text-center p-0 bg-white`} >
                        {selectedImage?(
                            <div className=''>
                                <img  className='box-upload-image-cliente'  src={URL.createObjectURL(selectedImage)} alt="imagem do brinde" />
                            </div>
                            ): (<div className='box-upload-text'></div>)}
                    </div>
                

            
                </div>
              
    
            </div>
            <div className='d-flex justify-content-end'>
                <button className='btn bg-principal'>Submeter o pedido</button>
            </div>
       </div>
    </div>
  )
}

export default personalizarEncomenda
