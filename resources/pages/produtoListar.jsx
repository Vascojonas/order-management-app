import React from 'react'
import {IoSearch} from 'react-icons/io5';
import {FontAwesomeIcon }from 'react-icons/fa';

import brinde1 from './../images/brinde-b.jpg';
import chaveiro from './../images/chaveiro.jpg';
import brindes from './../images/brindes.png';


function produtoListar() {
  return (
    <div>
       <h4 className='mt-3'>Todos Brindes</h4>

       <div className=''>
           <div className='row input-group col-12'>
              <div className=' col-6 p-0' >
                <input className='form-control border border-secondary text-black' type="text" name="pesquisar" id="pesquisar" 
                placeholder="Pesquisar..."/>
              </div>
               <button className='btn btn btn-outline-secondary'><IoSearch/></button>

               <butto className='btn btn-success col-2 ml-auto'>Novo brinde</butto>
         </div> 
       </div>

       <div className='mt-3'>
            <table class="table table-striped">
        
            <tbody>
              <tr className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={brinde1} />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td width="150">
                  <a href="#" class="btn btn-sm btn-circle btn-outline-info " title="Visualizar"><i class="fa fa-eye"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-danger" title="Eleminar" onclick="confirm('Are you sure?')"><i class="fa fa-times"></i></a>
                </td>
              </tr>

              <tr className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={chaveiro} />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td width="150">
                  <a href="#" class="btn btn-sm btn-circle btn-outline-info " title="Visualizar"><i class="fa fa-eye"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-danger" title="Eleminar" onclick="confirm('Are you sure?')"><i class="fa fa-times"></i></a>
                </td>
              </tr>
              <tr className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={brindes} />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td width="150">
                  <a href="#" class="btn btn-sm btn-circle btn-outline-info " title="Visualizar"><i class="fa fa-eye"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-danger" title="Eleminar" onclick="confirm('Are you sure?')"><i class="fa fa-times"></i></a>
                </td>
              </tr>

              <tr className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={brinde1} />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td width="150">
                  <a href="#" class="btn btn-sm btn-circle btn-outline-info " title="Visualizar"><i class="fa fa-eye"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-danger" title="Eleminar" onclick="confirm('Are you sure?')"><i class="fa fa-times"></i></a>
                </td>
              </tr>

              <tr className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={chaveiro} />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td width="150">
                  <a href="#" class="btn btn-sm btn-circle btn-outline-info " title="Visualizar"><i class="fa fa-eye"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-secondary" title="Edit"><i class="fa fa-edit"></i></a>
                  <a href="#" class="btn btn-sm btn-circle btn-outline-danger" title="Eleminar" onclick="confirm('Are you sure?')"><i class="fa fa-times"></i></a>
                </td>
              </tr>
              
            </tbody>
            </table>
       </div>

        <div className='mb-5 '>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
    </div>
  )
}

export default produtoListar
