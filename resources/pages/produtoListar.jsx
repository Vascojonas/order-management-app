import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import {IoSearch} from 'react-icons/io5';
import {FontAwesomeIcon }from 'react-icons/fa';

import brinde1 from './../images/brinde-b.jpg';
import chaveiro from './../images/chaveiro.jpg';
import brindes from './../images/brindes.png';


function produtoListar() {


  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);

  useEffect(() => {

      axios.get(`/api/admin/produtos`).then(res=>{
          if(res.status === 200)
          {
            console.log(res.data.products);
              setproducts(res.data.products)
              setLoading(false);
          }
      });

  }, []);

  const deleteProduct = (e, id) => {
      e.preventDefault();
      const thisClicked = e.currentTarget;
      thisClicked.innerText = "Deleting";

      axios.delete(`/api/admin/produtos/delete/${id}`).then(res=>{
          if(res.data.status === 200)
          {
              swal("Deleted!",res.data.message,"success");
              thisClicked.closest("tr").remove();
          }
          else if(res.data.status === 404)
          {
              swal("Error",res.data.message,"error");
              thisClicked.innerText = "Delete";
          }
      });
  }

  if(loading)
  {
      return <h4>Carrengando produtos...</h4>
  }
  else
  {
      var student_HTMLTABLE = "";

      student_HTMLTABLE = products.map( (item, index) => {
          return (
            <tr className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={brinde1} />
                </th>
                <td>{item.descricao}</td>
                <td>{item.quantidade}</td>
                <td>{item.preco},00MT</td>
                <td width="155">
                <a href="#" class="btn btn-sm btn-circle btn-outline-info " title="Visualizar"><i class="fa fa-eye"></i></a>
                <Link to={`/admin/produtos/cadastrar/${item.id}`} class="btn btn-sm btn-circle btn-outline-secondary ml-1 mr-1" title="Edit"><i class="fa fa-edit"></i></Link>
                <button class="btn btn-sm btn-circle btn-outline-danger"  onClick={(e) => deleteProduct(e, item.id)} title="Deletar"><i class="fa fa-times"></i></button>
                </td>
             </tr>
          );
      });
  }




















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
              <tr>
                    <th>Imagem</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Ações</th>
              </tr>

            <tbody>


                {student_HTMLTABLE}


            </tbody>
            </table>
       </div>

        <div className='mb-5 '>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Anterior</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Próximo</a>
              </li>
            </ul>
          </nav>
        </div>
    </div>
  )
}

export default produtoListar
