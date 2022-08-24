import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyC4xpqXs8cEUjudoG0EfKGD8J-xJYpurgs",
  
    authDomain: "tsakissa-629fa.firebaseapp.com",
  
    projectId: "tsakissa-629fa",
  
    storageBucket: "tsakissa-629fa.appspot.com",
  
    messagingSenderId: "662671214969",
  
    appId: "1:662671214969:web:b79f2514d1ff53ccad07a8"
  
  };
  
  export const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);