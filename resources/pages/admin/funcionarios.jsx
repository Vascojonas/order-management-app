import React from 'react'
import { NavLink } from 'react-router-dom';

import {IoSearch} from 'react-icons/io5';

function funcionarios() {
  return (
    <div>
        <div className='m-3 row'>
            < h4 >Funcionários</h4>

          
                <ul className='nav justify-content-center ml-auto'>
                    <li className='nav-item'>
                        <NavLink to='/admin/funcionarios' className='nav-link btn btn-outline-secondary mr-2'>Todos funcionários</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/admin/funcionarios/cadastrar' className='nav-link btn btn-outline-secondary'>Cadastrar</NavLink>
                    </li>

                </ul>
        </div>

        <div >

            <div className=''>
            <div className='row input-group col-12'>
                <div className=' col-6 p-0' >
                    <input className='form-control border border-secondary text-black' type="text" name="pesquisar" id="pesquisar"
                    placeholder="Pesquisar..."/>
                </div>
                <button className='btn btn btn-outline-secondary'><IoSearch/></button>
            </div>
            </div>

            <div className='mt-3'>
                    <table class="table table-striped">
                    <tr>
                            <th>Nome</th>
                            <th>Apelido</th>
                            <th>Data de nascimento</th>
                            <th>Perfil</th>
                            <th>Ações</th>
                    </tr>

                    <tbody>



                    </tbody>
                    </table>
            </div>  

        </div>


    </div>
  )
}

export default funcionarios
