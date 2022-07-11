import React, {useState, useEffect} from 'react'
import {useParams, Link } from 'react-router-dom';

import AuthUser from '../../js/components/AuthUser';
import swal from 'sweetalert';
import { set } from 'lodash';


function personalizarEncomenda() {
    const {getUser,getToken} = AuthUser();
    const [user, setUser] = useState(()=>{
      if(getUser()){
        return getUser();
      }else{
        return {role : '', id: ''}
      }
    });

    const { id } = useParams();
    const [update, setUpdate] = useState(false);
    const[editProduct, setEditProduct]= useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [productInput, setProduct] = useState({
        descricao: '',
        imagem: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value })
    }


    useEffect(() => {

      
      if(user.role){
        
        
        axios.get(`/clientes/encomenda/itens/`+user.id+'-'+id).then(res=>{
          
          console.log(res)
              if(res.data.status===200){
                // console.log("Found")
                 // console.log(res.data.data)

                 setProduct(res.data.data);
                 setUpdate(true);

              }else  if(res.data.status===404){

                  console.log("Not found")
                  console.log(res.data.data)
                  setUpdate(false);
              }
          
          })



           /* axios.get(`/clientes/encomenda/`+user.id).then(res=>{
                if(res.status === 200)
                {
                   // console.log(res.data.data)

                   console.log(id);
                   console.log(res.data.data);
                   if(res.data.data){
                     let  myp= res.data.data.filter((item)=>
                                item.id === id       
                             )

                    console.log("rresposta");
                       console.log(myp)
                       //setProduct(res.data.data)  
                   }
                }else if(res.status === 200)
                {
                    console.log(res.data.data)   
                    
                }
            })*/
        }
       
           /* axios.get(`/produtos/`+id).then(res=>{
            if(res.status === 200)
            {
                console.log(res.data.data)   
            }else if(res.status === 200)
            {
                console.log(res.data.data)   
                
            }
        });*/
  
    }, []);
    

    const saveDetails =(e)=>{
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
                    descricao:productInput.descricao,
                    imagem: res.data.path,
                    produto_id:id,
                    user_id:user.id
                }

                axios.post('/encomenda/itemSalvar/salvar', data).then(res => {
                    if(res.data.status==200){
                      console.log(res.data.data)

                    }if(res.data.status==402){
                      console.log(res.data.data)
                    }
                })



              /*  axios.post('/encomenda/detalhes/salvar', data).then(res => {
          
              if(res.data.status === 200)
              {
                  console.log(res.data.data);
          
                 swal("Success!",res.data.message);
                  setProduct({
                      descricao: '',
                      imagem: '',
                      error_list: [],
                    });
        
                    setSelectedImage(null);
                   
                
                }
                else if(res.data.status === 422)
                {
                  console.log("Fails", res.data.validate_err, "Error");
                  setProduct({...productInput, error_list: res.data.validate_err });
                }
              }); */
                
                })
              .catch(function (err) {
                console.log(err);
              });
        
    }

  

  return (
    <div className='mt-3' >
        <h4>Personalizar Encomenda</h4>

       <div className='conteudo mt-3 border-top'>
        <div className='col-8 offset-2 mt-3'>
                


                <div className='form-group row ml-2'>
                    <label htmlFor="descricao" className="col-md-4 col-form-label ">Descrição</label>
                    <div className="col-md-8">
                    <textarea className="form-control border-golden " name='descricao' id='descricao' onChange={handleInput} value={productInput.descricao}>

                    </textarea>
                  

                    </div>
                </div>
                    <div className=' border-top '>
                        <label>Upload do anexo</label>
                        <input className='border' type="file"  name="imagem" id="imagem" accept="image/*" 
                        onChange={(event)=>{
                        //console.log(event.target.files[0].name);
                        setSelectedImage(event.target.files[0]);
                        setProduct({...productInput, [event.target.name]: event.target.value })
                        //console.log(productInput.imagem)
    
                        }}  value={productInput.imagem}/>

                      
            
                    </div>
            

                    <div className='offset-6 '>

                        <div className={`box-upload ${selectedImage && 'box-upload-image-cliente'}  ml-2 offset-4 p-0 bg-white`} >
                            {selectedImage?(
                                <div className=''>
                                    <img  className='box-upload-image-cliente'  src={URL.createObjectURL(selectedImage)} alt="imagem do brinde" />
                                </div>
                                ): (<img  className='box-upload-image-cliente'  src={productInput.imagem} alt="imagem do brinde" />)}
                        </div>
                    </div>
                

            
    
            </div>

            {(update)?(<div className='d-flex justify-content-end'>
            <Link to='/cliente/carinho' className='btn mr-1 btn-outline-secondary'>Voltar</Link>
                <button onClick={saveDetails} className='btn bg-principal'>Actualizar</button>
            </div>):(
              <div className='d-flex justify-content-end'>
             <Link to='/cliente/carinho' className='btn mr-1 btn-outline-secondary'>Voltar</Link>

              <button onClick={saveDetails} className='btn bg-principal'>Salvar</button>
             </div>
            )}
       </div>
    </div>
  )
}

export default personalizarEncomenda
