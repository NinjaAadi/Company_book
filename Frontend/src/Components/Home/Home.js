import React from 'react'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import classes from './Home.module.css'
import Navbar from '../Navbar';
import book2 from '../../Utils/Images/book2.jpeg'
const Home = () => {
  return (
    <div className={classes.home}>
      <Navbar/>
      <div className={classes.heading}>
        <div className={classes.welmsg}>
          Welcome to Company Book
      </div>
      {/* <img src={book2} alt="book" style={{backgroundColor:"white",width:"300px",height:"300px"}}/> */}
    </div>
      <div className={classes.forms}>
      <Login/>
      <SignUp/>
      </div>
    </div>
  )
}

export default Home
