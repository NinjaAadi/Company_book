import React ,{useState} from 'react'
import classes from './Signup.module.css';
const SignUp = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function Signup (){
            let item={name,password,email};
            console.warn(item);
           let result= await fetch("http://localhost:5000/api/v1/users/register",{
                method:'POST',
                body:JSON.stringify(item),
                header:{
                    "Content-Type":'application/json',
                    "Accept":'application/json'
                }
            });
            result = await result.json();
            console.warn("result",result);
    }
    return (
      <>
        <div className={classes.signup}>
          <div className={classes.innerSignup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <button onClick={Signup}>SignUp</button>
          </div>
        </div>
      </>
    );
}

export default SignUp
