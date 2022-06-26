import React from 'react'
import {Outlet} from 'react-router-dom'; 

import Header from "../header";
import Nav from "../nav";

function admin() {
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
