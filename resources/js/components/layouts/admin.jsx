import React ,{useState,  useEffect}  from 'react'
import {Outlet} from 'react-router-dom'; 

import Header from "../header";
import Nav from "../nav";

function admin() {

  const [encomendas, setEncomendas] = useState();

  useEffect(() => {

   axios.get(`/api/admin/encomendas/listar`).then(res=>{
       if(res.status === 200)
       {
           setEncomendas(res.data.data)
           console.log(res.data.data)
       }
   });

}, []);



  return (
  <div className="d-flex h" exact="/admin">
      <Nav  />
      <div className="col-10 ">
          <Header />
          <Outlet />
      </div>
   </div>
  )
}

export default admin
