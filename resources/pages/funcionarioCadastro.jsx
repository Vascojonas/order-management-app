import React from 'react'
import { NavLink } from 'react-router-dom';

function funcionarioCadastro() {
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

        <div class="row container mt-3">
 
	        <div class="col-6"> 
	        
	            <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text form-control">Nome</span>
	                </div>
	                <input class="form-control" type="text" placeholder="Digite o nome"  />
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Apelido</span>
	                </div>
	                <input class="form-control" type="text" placeholder="Digite o apelido"  />
	            </div>
	            
	            <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Nº BI</span>
	                </div>
	                <input class="form-control" type="text" placeholder="Bilhete de identidade (BI)"  />
	            </div>
	            
	          
	            <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Cidade</span>
	                </div>
	                <input class="form-control" type="text" placeholder="Digite a cidade" />
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Bairro</span>
	                </div>
	                <input class="form-control" type="text" placeholder="Digite o bairro"   />
	            </div>
	            
	             <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Quarteirão</span>
	                </div>
	                <input class="form-control" type="Number" placeholder="Numero do quarteirão" />
	                
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Casa</span>
	                </div>
	                <input class="form-control" type="number" placeholder="Numero da casa"  />
	            </div>
	            
	           
	             <div class="input-group m-3"> 
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Sexo</span>
	                </div>
	                <select id="sexo"  class="form-control" >
	                	<option value="">Selecione o sexo</option>
	                	<option value="M">Masculino</option>
	                	<option value="F">Femenino</option>
	                </select>
	            </div>
	           
	            <div class="input-group m-3"> 
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Data de Nascimento</span>
	                </div>
	                <input class="form-control" type="date" />
	            </div>
	            
	            
	        </div> 
	
	        <div class="col-6">
	  
	            <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Username</span>
	                </div>
	                <input class="form-control" type="text" placeholder="Digite o username"  />
	            </div>
	            
	
	   

				<div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Password</span>
	                </div>
	                <input class="form-control" type="text" id="password" placeholder="Password"  />
	                <input class="form-control" type="text"  id="confirmar" placeholder="Confimar password"/>
	            </div>
	      
	            <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Data de entrada</span>
	                </div>
	                <input class="form-control" type="date" />
	            </div>
	            
	            <div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Data de saída</span>
	                </div>
	                <input class="form-control" type="date" />
	            </div>
	            
	            
	       		
	       		<div class="input-group m-3">
	                <div class="input-group-prepend">
	                    <span class="input-group-text">Telefone</span>
	                </div>
	                <input class="form-control" type="number" placeholder="Telefone prinipal"  />
	                <input class="form-control" type="number" placeholder="Telefone opcional"  />
	            </div>
	            
	            <div class="input-group m-3">
	                <button type="submit"  class="btn bg-principal col-4  ml-auto mr-4'" >cadastrar</button>
	            </div>
	        	
	        </div> 
		
       </div>
        </div>
  )
}

export default funcionarioCadastro