import axios from 'axios';
import React,{useState} from 'react'
import classes from './Login.module.css';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");


    function loginData() {
    //    axios.get('http://localhost:5000/api/v1/users/login')
       axios
         .get("http://localhost:5000/api/v1/users/login")
         .then((res) => console.log(res))
         .catch((err) => console.error(err));

     }

    return (
        <>
            <div className={classes.login}>
                <div className={classes.innerLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button onClick={loginData}>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login
