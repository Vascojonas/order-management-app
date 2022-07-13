import React,{ useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';


function funcionarioCadastro() {
	const {id} = useParams()
	const [btnDisabled, setBtnDisabled]= useState(true)
    const [message, setMessage]= useState(null)
	const [edit, setEdit]= useState(false);

	const [funcionarioInput, setFuncionario] = useState({
 
		nome          :'',
		apelido       :'',
		bi            :'',
		cidade        :'',
		bairro        :'',
		quarteirao    :'',
		casa		  :'',
		sexo		  :'',
		dataNascimento:'',
		perfil		   :'',
		username:'',
		email:'',
		password:'',
		tel1:'',
		tel2:'',

		error_list: [],
	});

	const cadastrarFuncionario = (e) => {

        e.preventDefault();
        
        const data = {
            nome:funcionarioInput.nome,
            apelido:funcionarioInput.apelido,
            bi:funcionarioInput.bi,
            cidade:funcionarioInput.cidade,
            bairro:funcionarioInput.bairro,
            quarteirao:funcionarioInput.quarteirao,
            casa:funcionarioInput.casa,
            sexo:funcionarioInput.sexo,
            dataNascimento:funcionarioInput.dataNascimento,
            perfil:funcionarioInput.perfil,  
            tel1:funcionarioInput.tel1,
            tel2:funcionarioInput.tel2,
            email:funcionarioInput.email,
            username:funcionarioInput.username,
            password:funcionarioInput.password
     }


	 console.log(id)
	 
        
         axios.post('/api/admin/funcionario/salvar', data).then(res => {
      
          
          if(res.data.status === 200)
          {
                console.log(res.data.data);
                
      
              swal("Sucesso!",res.data.message,"success");

              setFuncionario({
				nome          :'',
				apelido       :'',
				bi            :'',
				cidade        :'',
				bairro        :'',
				quarteirao    :'',
				casa		  :'',
				sexo		  :'',
				dataNascimento:'',
				perfil		   :'',
				username:'',
				email:'',
				password:'',
				tel1:'',
				tel2:'',
		
				error_list: [],
                });

                
            }
            else if(res.data.status === 422)
            {
              console.log("Fails", res.data.validate_err);
              setFuncionario({...funcionarioInput, error_list: res.data.validate_err });
            }
          });
        
    }


	const handleInput = (e) => {
        e.persist();
        setFuncionario({...funcionarioInput, [e.target.name]: e.target.value })
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
    <div className='m-3 row'>
            < h4 >Cadastrar Funcionário</h4>

          
                <ul className='nav justify-content-center ml-auto'>
                    <li className='nav-item'>
                        <NavLink to='/admin/funcionarios' className='nav-link btn  mr-2 btn-outline-light border border-secondary'>Todos funcionários</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/admin/funcionarios/cadastrar' className='nav-link btn btn-outline-secondary'>Cadastrar</NavLink>
                    </li>

                </ul>

        <div className="row container mt-3">
 
	        <div className="col-6"> 
	        
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text ">Nome</small>
	                </div>
	                <input name='nome' className="form-control" type="text" placeholder="Digite o nome" 
					onChange={handleInput} value={funcionarioInput.nome} />
		
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Apelido</small>
	                </div>
	                <input name='apelido' className="form-control" type="text" placeholder="Digite o apelido" 
					onChange={handleInput} value={funcionarioInput.apelido} />
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.nome}</small>
					<small className="text-danger ml-auto"> {funcionarioInput.error_list.apelido}</small>
				</div>
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Nº BI</small>
	                </div>
	                <input name='bi' className="form-control" type="text" placeholder="Bilhete de identidade (BI)"
					onChange={handleInput} value={funcionarioInput.bi}  />
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.bi}</small>
				</div>
				
	            
	          
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Cidade</small>
	                </div>
	                <input name='cidade' className="form-control" type="text" placeholder="Digite a cidade" 
					onChange={handleInput} value={funcionarioInput.cidade}/>
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Bairro</small>
	                </div>
	                <input name='bairro' className="form-control" type="text" placeholder="Digite o bairro" 
					onChange={handleInput} value={funcionarioInput.bairro}  />
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.cidade}</small>
					<small className="text-danger ml-auto"> {funcionarioInput.error_list.bairro}</small>
				</div>
	            

	             <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Quarteirão</small>
	                </div>
	                <input name='quarteirao' className="form-control" type="Number" placeholder="Numero do quarteirão" 
					onChange={handleInput} value={funcionarioInput.quarteirao}/>
	                
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Casa</small>
	                </div>
	                <input name='casa' className="form-control" type="number" placeholder="Numero da casa"  
					onChange={handleInput} value={funcionarioInput.casa}/>
	            </div>

				<div  className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.quarteirao}</small>
					<small className="text-danger ml-auto"> {funcionarioInput.error_list.casa}</small>
				</div>
	            
	           
	             <div className="input-group m-3"> 
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Sexo</small>
	                </div>
	                <select name='sexo' id="sexo"  className="form-control"
					onChange={handleInput} value={funcionarioInput.sexo} >
	                	<option value="">Selecione o sexo</option>
	                	<option value="M">Masculino</option>
	                	<option value="F">Femenino</option>
	                </select>
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.sexo}</small>
				</div>
	           
	            <div className="input-group m-3"> 
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Data de Nascimento</small>
	                </div>
	                <input name='dataNascimento' className="form-control" type="date" 
					onChange={handleInput} value={funcionarioInput.dataNascimento}/>
	            </div>
	            <div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.dataNascimento}</small>
				</div>
	            
	        </div> 
	
	        <div className="col-6">

				<div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Perfil</small>
	                </div>
	                <select name='perfil' className='form-control' onChange={handleInput} value={funcionarioInput.perfil}>
						<option>Selecione o perfil</option>
						<option value='editor' >Editor</option>
						<option value='admin'>Administrador</option>
					</select>
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.perfil}</small>
				</div>
	  
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Username</small>
	                </div>
	                <input name='username' className="form-control" type="text" placeholder="Digite o username" 
					onChange={handleInput} value={funcionarioInput.username} />
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.username}</small>
				</div>

				<div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Email</small>
	                </div>
	                <input name='email' className="form-control" type="text" placeholder="Digite o email" 
					onChange={handleInput} value={funcionarioInput.email} />
	            </div>
	            <div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.email}</small>
				</div>
	
	   

				<div className="input-group m-3 mb-0">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Password</small>
	                </div>
	                <input name='password'  className="form-control" type="password" id="password" placeholder="Password" 
					onChange={handleInput} value={funcionarioInput.password} />
	                <input name='confirm'  onChange={confirmPassword} className="form-control" type="password"  
					id="confirm" placeholder="Confimar password"/>
					
	            </div>
				{message && <div className='text-danger ml-3 text-right'>{message}</div>}
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.password}</small>
				</div>
	      
	            
	       		
	       		<div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <small className="input-group-text">Telefone</small>
	                </div>
	                <input  name='tel1'  className="form-control " type="number" placeholder="Telefone prinipal" 
					onChange={handleInput} value={funcionarioInput.tel1} />
	                <input  name='tel2'  className="form-control" type="number" placeholder="Telefone opcional"  
					onChange={handleInput} value={funcionarioInput.tel2}/>
	            </div>
				<div className='m-3'>
					<small className="text-danger">{funcionarioInput.error_list.tel1}</small>
				</div>
	            
	            <div className="input-group m-3">
	                <button disabled={btnDisabled} onClick={cadastrarFuncionario} type="submit"  className={`btn bg-principal col-4  ml-auto mr-4`} >cadastrar</button>
	            </div>
	        	
	        </div> 
		
       </div>
        </div>
  )
}

export default funcionarioCadastro