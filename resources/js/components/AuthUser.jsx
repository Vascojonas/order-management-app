import axios from 'axios';
import {useState} from 'react'
import { useNavigate, Navigate} from "react-router-dom";



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

  
  const saveToken = (user,token)=>{
    console.log(user)

    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    
    let role = user.role;
    if(role=='admin'||role=='editor'){
      
       navigate('/admin/produtos/cadastrar');
    }else if (role=='user'){
      navigate('/');
    }    
  }
  const http = axios.create(
    {
      baseURL:"http://localhost:8000/api",
      headers: {
        'content-type': 'application/json'
    }
    }
  )

  return {
    setToken:saveToken,
    token,
    getUser,
    getToken,
    http
  }
}

export default AuthUser