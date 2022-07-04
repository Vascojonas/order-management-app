import React, {useState} from 'react'
import swal from 'sweetalert';


function clienteCadastro() {
    const [btnDisabled, setBtnDisabled]= useState(true)
    
    const [clienteInput, setCliente] = useState({
        nome: '',
        apelido: '',
        telefone: '',
        email: '',
        password: '',
        error_list: [],
    });
    const [message, setMessage]= useState(null)

    const[validator, setValidator]= useState({
        password: false,
        confirm: false
    })
    const [text, setText] =useState({
        password:'',
        confirmPassword:''
    })

    const saveClient = (e) => {

        e.preventDefault();
        
        const data = {
            nome:clienteInput.nome,
            apelido:clienteInput.apelido,
            telefone:clienteInput.telefone,
            email:clienteInput.email,
            username:clienteInput.username,
            password:clienteInput.password
            }
        
         axios.post('/clientes/salvar', data).then(res => {
      
          
          if(res.data.status === 200)
          {
                console.log(res.data.data);
                
      
              swal("Success!",res.data.message,"success");

              setCliente({
                  nome: '',
                  apelido: '',
                  telefone: '',
                  email: '',
                  username: '',
                  password: '',
                  error_list: [],
                });

                
            }
            else if(res.data.status === 422)
            {
              console.log("Fails", res.data.validate_err);
              setCliente({...clienteInput, error_list: res.data.validate_err });
            }
          });
        
      }





    const handleInput = (e) => {
        e.persist();
        setCliente({...clienteInput, [e.target.name]: e.target.value })
        
    /*    if(e.target.name==='password'){
            if((e.target.value)==''){
                setValidator(...validator, text.password=false)
                setText(...text, text.password==null)
            }else if((e.target.value)!==''&& (e.target.value).length<8){
                setText(...text, text.password="Password tem que ter no mínimo 8 digitos")
                setValidator(...validator, text.password=false)
            }else{
                setText(...text, text.password==null)
                setValidator(...validator, text.password=true)
            }
        }
    */
    }

    const confirmPassword=(e)=>{
        let password = document.getElementById('password').value
        
        if(e.target.value !=password){
           setMessage("password inválido")
            setBtnDisabled(true);
        }else if(password==''|| e.target.value==''){
            setBtnDisabled(true);
            
        }else{
            setBtnDisabled(false);
            setMessage(null)
        }
    }

  return (
    <div className='mt-3' >
        <h4>Criar Conta</h4>

    <div className='conteudo mt-3 border-top'>
            <div className='col-8 offset-2 mt-3'>
                
              <div className='form-group row ml-2 '>
                    <label htmlFor="nome" className="col-md-4 col-form-label ">Nome</label>
                    <div className="col-md-8">
                    <input name='nome' className="form-control" type="text" placeholder="Digite o nome" 
                    onChange={handleInput} value={clienteInput.nome} />
                    <span className="text-danger">{clienteInput.error_list.nome}</span>
                    </div>
               </div>

               <div className='form-group row ml-2 '>
                    <label htmlFor="apelido" className="col-md-4 col-form-label ">Apelido</label>
                    <div className="col-md-8">
	                <input name='apelido' className="form-control" type="text" placeholder="Digite o apelido"  
                    onChange={handleInput} value={clienteInput.apelido}/>
                    <span className="text-danger">{clienteInput.error_list.apelido}</span>
                    </div>
                </div>

                <div className='form-group row ml-2 '>
                    <label htmlFor="telefone" className="col-md-4 col-form-label ">Telefone</label>
                    <div className="col-md-8">
	                <input name='telefone' className="form-control " type="number" placeholder="Digita o número de telefone"  
                    onChange={handleInput} value={clienteInput.telefone}/>
                    <span className="text-danger">{clienteInput.error_list.telefone}</span>
                    </div>
                </div>

                <div className='form-group row ml-2 '>
                    <label htmlFor="email" className="col-md-4 col-form-label ">Email</label>
                    <div className="col-md-8">
	                <input name='email' className="form-control " type="email" placeholder="Digita o seu email" 
                    onChange={handleInput} value={clienteInput.email} />
                    <span className="text-danger">{clienteInput.error_list.email}</span>
                    </div>
                </div>
                <h5 className='ml-3'>Dados de acesso</h5>
                <hr/>


                <div className='form-group row ml-2 '>
                    <label htmlFor="username" className="col-md-4 col-form-label ">Username</label>
                    <div className="col-md-8">
	                <input name='username' className="form-control " type="text" placeholder="Digite o seu username" 
                    onChange={handleInput} value={clienteInput.username} />
                    <span className="text-danger">{clienteInput.error_list.username}</span>
                    </div>
                </div>

                <div className='form-group row ml-2 '>
                    <label htmlFor="password" className="col-md-4 col-form-label ">Password</label>
                    <div className="col-md-8">
	                    <input id='password' name='password' className="form-control " type="password" placeholder="Digita o seu password" 
                        onChange={handleInput} value={clienteInput.password} />
                        {/*text.password && <div className='text-danger'>{text.password}</div>*/}
                        <span className="text-danger">{clienteInput.error_list.password}</span>

                    </div>
                </div>

                <div className='form-group row ml-2 '>
                    <label htmlFor="passwordConfirm" className="col-md-4 col-form-label ">Confirmar Password</label>
                    <div className="col-md-8">
	                <input name='confirm' onChange={confirmPassword} className="form-control " type="password" placeholder="Digita  novamente o seu password"  />
                        {message && <div className='text-danger'>{message}</div>}
                    </div>
                </div>
            
            </div>
            <div className='d-flex justify-content-end'>
                <button disabled={btnDisabled} onClick={saveClient}  className='btn bg-principal'>Criar Conta</button>
            </div>
    </div>
</div>
  )
}

export default clienteCadastro