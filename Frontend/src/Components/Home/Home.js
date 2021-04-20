import React from 'react'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import classes from './Home.module.css'
const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.forms}>
      <Login/>
      <SignUp/>
      </div>
    </div>
  )
}

export default Home
