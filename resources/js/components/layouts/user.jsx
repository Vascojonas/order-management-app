import React, {useState, useEffect} from 'react'
import AuthUser from '../AuthUser';

import {NavLink, Link,Outlet} from 'react-router-dom';
import {FaGifts} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BsInstagram, BsTwitter, BsWhatsapp, BsTelephoneOutboundFill,
   BsFillPersonFill, BsFillHeartFill ,BsCart3, BsFillHouseDoorFill ,BsCartPlus,BsCartX,BsFillEnvelopeFill} from 'react-icons/bs'

import Logo from './logo.jpg';

function user() {
  const {logOut, getUser,getToken} = AuthUser();
  const [user, setUser] = useState(()=>{
    if(getUser()){
      return getUser();
    }else{
      return {role : '', id:''}
    }
  });

  const [carrinho,setCarrinho]=useState([]);
  const [wish,setWish]=useState([]);

  const [footer, setfooter]=useState(true);

  const logout =()=>{
      if(getToken() != undefined){
        logOut();
      }
  }

  useEffect(() => {

    let data={user_id: user.id}
    //console.log(data);
    axios.get('/carrinho/produtos/'+user.id).then(res=>{
        
      if(res.status === 200)
        {
         // console.log(res.data.data)
          
          setCarrinho(res.data.data)
          
        }
    });

}, []);


useEffect(() => {

  let data={user_id: user.id}
  //console.log(data);
  axios.get('/wish/produtos/'+user.id).then(res=>{
      
    if(res.status === 200)
      {
        //console.log(res.data.data)
        
        setWish(res.data.data)
        
      }
  });

}, []);





  return (
    <div className='h-full '>
        <header className='border-golden  nav-principal bg-principal p-0 pr-4 zindex-sticky'>
            <nav className='d-flex justify-content-between navbar navbar-expand-lg navbar-light m-0 mr-3 p-0  '>
              
              <div className=''>
                <h4 className='ml-4 '><span className='text-golden'><img className='logo' src={Logo} /></span> Tsakissa</h4>
              </div>
             
              <div className=" justify-content-end collapse navbar-collapse" id="navbarNav ">
                  <ul className="navbar-nav nav-header ">
                    <li className="nav-item">
                      <NavLink to='/' className="nav-link text-dark" >< BsFillHouseDoorFill size={15}/> Home</NavLink>
                    </li>
                    
                    <li className="nav-item">
                  
                            
                            <div className="dropdown">
                              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 <BsFillPersonFill /> Minha conta
                              </button>
                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              {(user.role==='user')&&(<NavLink  to='/cliente/encomendas' className="dropdown-item btn" >Encomendas</NavLink>)}
                                
                                {(user.role==='')&&(<NavLink  to='clientes/cadastrar' className="dropdown-item btn" >Cadastrar-se</NavLink>)}
                               {(user.role!=='')?( <button onClick={logout}  className="dropdown-item " >Sair</button>):
                               (<NavLink  to='/login' className="dropdown-item " >Acessar</NavLink>)}
                              </div>
                            </div>
                
                    </li>
                    {(user.role==='user'||user.role==='')&&(<li className="nav-item m">
                          <NavLink to='/cliente/whish' className="nav-link  text-danger" >
                             <BsFillHeartFill size={25}/><span className='float-right number-box text-dark mt-0'>{wish.length}</span> 
                          </NavLink>
                    </li>)}

                     {(user.role==='user'||user.role==='')&&(<li className="nav-item m">
                          <NavLink to='/cliente/carinho' className="nav-link  text-dark" >
                             <BsCart3 size={25}/><span className='float-right number-box text-dark mt-0'>{carrinho.length}</span> 
                          </NavLink>
                    </li>)}
                  </ul>
              </div>
            </nav>
        </header>
        <div className='container-md  h-100'>
             <Outlet  context={[wish,setWish, carrinho, setCarrinho]} />
        </div>  
      
      {footer?( 
        <footer className=' bg-principal'>
              <div className='d-flex m-3 mt-5'>
                  <div className='box-rodape col-4 '>
                    <h5> SOBRE NÓS </h5>
                    <p className='text-dark'>
                     A Tsakissa é uma empresa jovem, dedicada  na produção e venda de artigos personalizados para todas as ocasiões.
                    </p>
                  </div>

                  <div className='box-rodape col-4 '>
                    <h5> TERMOS E CONDIÇÕES</h5>
                    <p className='text-dark'>
                     As encomendas são confirmadas mediante pagamento e levam 48h para estar prontas após a sua confirmação.
                    </p>
                  </div>
            
                  <div className='box-rodape col-4 '>
                    <h5> ENTRAR EM CONTACTO</h5>

                   <div className=''>
                     <Link to='#' className='btn btn-outline-dark b-rounded' title='Telefone'><BsFillEnvelopeFill size={30}/> tsakisaalda@gmail.com</Link>
                   </div>
                   <div className=''>
                    <Link to='#' className='btn btn-outline-dark b-rounded' title='Telefone'><BsTelephoneOutboundFill size={30}/>843195364</Link>
                   </div>
                    <div className='d-flex '>
                        <a target='_blank' href='https://instagram.com/tsakissamz?r=nametag' className='btn btn-outline-dark b-rounded' title='Istagram'><BsInstagram size={30} /></a>
                    
                        <a target='_blank' href='https://bit.ly/3rABIyv' className='btn btn-outline-dark b-rounded' title='Whatsapp'><BsWhatsapp size={30} /></a>

                   </div>
                 
                  </div>
            
              
            </div>
        </footer> 
        ):
        ''}

    </div>
  )
}



export default user
