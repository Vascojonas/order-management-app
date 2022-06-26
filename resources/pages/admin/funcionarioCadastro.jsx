import React,{ useState } from 'react'
import { NavLink } from 'react-router-dom';


function funcionarioCadastro() {
	const {btnDisabled, setBtnDisabled}=useState(true);
	const [funcionarioInput, setFuncionarioInput] = useState({
 
		nome          :'',
		apelido       :'',
		bi            :'',
		cidade        :'',
		bairro        :'',
		quarteirao    :'',
		casa		  :'',
		sexo		  :'',
		dataNascimento:'',
		user_id		  :'',
		perfil		   :'',
		username:'',
		password:'',
	    passwordConfirm:'',
		dataEntrada:'',
		dataSaida:'',
		telf1:'',
		telf2:'',

		error_list: [],
	});


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
	                    <span className="input-group-text form-control">Nome</span>
	                </div>
	                <input className="form-control" type="text" placeholder="Digite o nome"  />
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Apelido</span>
	                </div>
	                <input className="form-control" type="text" placeholder="Digite o apelido"  />
	            </div>
	            
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Nº BI</span>
	                </div>
	                <input className="form-control" type="text" placeholder="Bilhete de identidade (BI)"  />
	            </div>
	            
	          
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Cidade</span>
	                </div>
	                <input className="form-control" type="text" placeholder="Digite a cidade" />
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Bairro</span>
	                </div>
	                <input className="form-control" type="text" placeholder="Digite o bairro"   />
	            </div>
	            
	             <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Quarteirão</span>
	                </div>
	                <input className="form-control" type="Number" placeholder="Numero do quarteirão" />
	                
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Casa</span>
	                </div>
	                <input className="form-control" type="number" placeholder="Numero da casa"  />
	            </div>
	            
	           
	             <div className="input-group m-3"> 
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Sexo</span>
	                </div>
	                <select id="sexo"  className="form-control" >
	                	<option value="">Selecione o sexo</option>
	                	<option value="M">Masculino</option>
	                	<option value="F">Femenino</option>
	                </select>
	            </div>
	           
	            <div className="input-group m-3"> 
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Data de Nascimento</span>
	                </div>
	                <input className="form-control" type="date" />
	            </div>
	            
	            
	        </div> 
	
	        <div className="col-6">

				<div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Perfil</span>
	                </div>
	                <select className='form-control'>
						<option>Selecione o perfil</option>
						<option>Editor</option>
						<option>Administrador</option>
					</select>
	            </div>
	  
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Username</span>
	                </div>
	                <input className="form-control" type="text" placeholder="Digite o username"  />
	            </div>
	            
	
	   

				<div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Password</span>
	                </div>
	                <input className="form-control" type="text" id="password" placeholder="Password"  />
	                <input className="form-control" type="text"  id="confirmar" placeholder="Confimar password"/>
	            </div>
	      
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Data de entrada</span>
	                </div>
	                <input className="form-control" type="date" />
	            </div>
	            
	            <div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Data de saída</span>
	                </div>
	                <input className="form-control" type="date" />
	            </div>
	            
	            
	       		
	       		<div className="input-group m-3">
	                <div className="input-group-prepend">
	                    <span className="input-group-text">Telefone</span>
	                </div>
	                <input className="form-control " type="number" placeholder="Telefone prinipal"  />
	                <input className="form-control" type="number" placeholder="Telefone opcional"  />
	            </div>
	            
	            <div className="input-group m-3">
	                <button type="submit"  className={`btn bg-principal col-4  ml-auto mr-4  ${!btnDisabled&&'disabled'}`} >cadastrar</button>
	            </div>
	        	
	        </div> 
		
       </div>
        </div>
  )
}

export default funcionarioCadastro