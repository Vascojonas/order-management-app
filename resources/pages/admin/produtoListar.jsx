import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import {IoSearch} from 'react-icons/io5';
import {FontAwesomeIcon }from 'react-icons/fa';




function produtoListar() {


  const [loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);

  useEffect(() => {

      axios.get(`/api/admin/produtos`).then(res=>{
          if(res.status === 200)
          {
              setproducts(res.data.products)
              if(res.data.products !=''){
                setLoading(false);
              }
              
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
              swal("Eliminado!",res.data.message,"success");
              thisClicked.closest("tr").remove()   
          }
          else if(res.data.status === 404)
          {
              swal("Ops",res.data.message,"error");
              thisClicked.innerText = "Eliminar";
          }

      });
  }

  if(loading)
  {
      return (
        <div style={{height:'68%'}} >
          <h4 className='mt-3'>Todos Brindes</h4>

          <div className=''>
              <div className='row input-group col-12'>
                  <div className=' col-6 p-0' >
                    <input readOnly className='form-control border border-golden text-black' type="search" name="pesquisar" id="pesquisar"
                    placeholder="Pesquisar..."/>
                  </div>
                  <button disabled className='btn btn btn-outline-golden'><IoSearch/></button>

                  <Link to='/admin/produtos/cadastrar' className='btn bg-principal col-2 ml-auto'>Novo brinde</Link>
            </div>
          </div>

          <div className=' text-center mt-3 h-100 ' >
              <div className='d-flex  align-items-center h-100 text-center'>
                 <div className='w-100'>SEM DADOS</div>
              </div>
          </div>


       </div>


      )
  }
  else
  {
    
    var FUNCIONARIO_HTMLTABLE = "";

    
    FUNCIONARIO_HTMLTABLE = products.map( (item, key) => {
          return (
            <tr key={key} className=''>
                <th scope="row" className=' list-img p-0'>
                <img className='list-img' src={item.imagem} />
                </th>
                <td>{item.nome}</td>
                <td>{item.descricao}</td>
                <td>{item.preco},00MT</td>
                <td width="160">
                <button href="#" className="btn btn-sm btn-circle btn-outline-golden " title="Visualizar"><i className="fa fa-eye"></i></button>
                <Link to={`/admin/produtos/cadastrar/${item.id}`} className="btn btn-sm btn-circle bg-principal ml-1 mr-1" title="Editar"><i className="fa fa-edit"></i></Link>
                <button className="btn btn-sm btn-circle  btn btn-outline-danger"  onClick={(e) => deleteProduct(e, item.id)} title="Deletar"><i className="fa fa-times"></i></button>
            
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
                <input className='form-control border border-golden text-black' type="text" name="pesquisar" id="pesquisar"
                placeholder="Pesquisar..."/>
              </div>
               <button className='btn btn bg-principal'><IoSearch/></button>

               <Link to='/admin/produtos/cadastrar' className='btn btn-outline-secondary col-2 ml-auto'>Novo brinde</Link>
         </div>
       </div>

       <div className='mt-3'>
            <table className="table table-striped">
              <thead>
                <tr>
                      <th>Imagem</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Preço</th>
                      <th>Ações</th>
                </tr>
               </thead>

            <tbody>


                {FUNCIONARIO_HTMLTABLE}


            </tbody>
            </table>
       </div>

       {/* <div className='mb-5 '>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Anterior</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Próximo</a>
              </li>
            </ul>
          </nav>
        </div> */}
    </div>
  )
}

export default produtoListar
