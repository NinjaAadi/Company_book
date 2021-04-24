import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
const Navbar = () =>{
        const [toggleOn,setToggleOn]=useState(true);
        const toggleIcon = () =>{
            if(toggleOn===true){
                setToggleOn(false);
            }
            else{
                setToggleOn(true);
            }
        }
        return (
          <>
            
            <div className={classes.Navbar}>
                <div className={classes.title}>Company Book</div>
              <ul className={toggleOn ? classes.navLinks:classes.navLinksActive}>
              
                <li>
                  <Link to="#">link1</Link>
                </li>
                <li>
                  <Link to="#">link2</Link>
                </li>
                <li>
                  <Link to="#">link3</Link>
                </li>
                <li>
                  <Link to="#">link4</Link>
                </li>
                <li>
                  <Link to="#">link5</Link>
                </li>
              
              </ul>
              <FontAwesomeIcon
                className={classes.toggler }
                icon={toggleOn ? faBars : faTimes}
                onClick={toggleIcon}
              />

            </div>
          </>
        );
}

export default Navbar;