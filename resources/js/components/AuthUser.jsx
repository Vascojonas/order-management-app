import axios from 'axios';
import {useState} from 'react'
import { useNavigate} from "react-router-dom";



function AuthUser() {
  const navigate = useNavigate();

  const [token, setToken] = useState(getToken);
  const [user, setUser] = useState(getUser);

  const getToken =()=>{
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  }

  const getUser =()=>{
    const userString = sessionStorage.getItem('user');
    const user_details = JSON.parse(userString);
    return user_details;
  }

  const logOut=()=>{

    let userRole =  (getUser()).role;
    sessionStorage.clear()

    if(userRole==='user'){
      navigate('/login');
       window.location.reload(false);
    }else{
      navigate('/login');
       window.location.reload(false);

    }
  }

  
  const saveToken = (user,token)=>{
    console.log(user)

    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    
    let role = user.role;
    if(role=='admin'||role=='editor'){
      
       navigate('/admin/produtos/cadastrar');
        window.location.reload(false);
    }else if (role=='user'){
      navigate('/');
       window.location.reload(false);
    }    
  }
  const http = axios.create(
    {
      //baseURL:"http://localhost:8000/api",
      baseURL:"https://tsakissa.herokuapp.com/api",

      headers: {
        'content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': window.csrf_token
      }
    }
  )




  return {
    setToken:saveToken,
    token,
    getUser,
    logOut,
    getToken,
    http
  }
}

export default AuthUser