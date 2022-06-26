import React from 'react'
import {IoSearch} from 'react-icons/io5';


function main() {
  return (
    <div className='mt-5'>
       <div className='d-flex justify-content-end input-group col-12'>
            <div className=' col-6 p-0' >
               <input className='form-control border-golden text-black' type="search" name="pesquisar" id="pesquisar"
                placeholder="Pesquisar..."/>
             </div>
              <button  className='btn bg-principal col-1'><IoSearch/></button>
      </div>

      <div className='banner border-golden mt-2'>
            Fotos
      </div>
    </div>
  )
}

export default main
