
import React,{useState} from 'react'
import classes from './Login.module.css';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    return (
        <>
            <div className={classes.login}>
                <div className={classes.innerLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login
