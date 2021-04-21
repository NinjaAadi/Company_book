import React ,{ useState} from 'react'
import classes from './Signup.module.css';
import axios from 'axios';
const SignUp = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [adminPassword,setAdminPassword]=useState("");
    

    function signUpData() {
      //    axios.get('http://localhost:5000/api/v1/users/login')
      axios
        .post("http://localhost:5000/api/v1/users/register")
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
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
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Admin Password"
            />
            <button onClick={signUpData}>SignUp</button>
          </div>
        </div>
      </>
    );
}

export default SignUp;
