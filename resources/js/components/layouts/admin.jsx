import { result } from 'lodash';
import React ,{useState,  useEffect}  from 'react'
import {Outlet} from 'react-router-dom'; 

import Header from "../header";
import Nav from "../nav";

function admin() {

  const [encomendas, setEncomendas] = useState([]);

  useEffect(() => {

    axios.get(`/api/admin/encomendas/listar`).then(res=>{
        if(res.status === 200)
        {
            setEncomendas(res.data.data)
            // console.log(res.data.data)
             if(res.data.data){
            }   
        }
    });

    }, []);

        
    const pendentes = encomendas.filter((item)=>
    item.status==1
    ); 
    
    let today = new Date()
    var date = today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+today.getDate();
    
    const forToday =encomendas.filter((item)=>
           (item.prazo.split(" ")[0])==date && (item.status==1||item.status==2)
    );


   



  return (
  <div className="d-flex h" exact="/admin">
      <Nav  />
      <div className="col-10 ">
          <Header  pendentes={pendentes.length} hoje={forToday.length}  />
          <Outlet context={[encomendas,setEncomendas]}  />
      </div>
   </div>
  )
}

export default admin
