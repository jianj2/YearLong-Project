/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani
 *
 * The Navbar component defines our Navbar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Navbar component
 *
 */

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

// Import styles.
import '../styles/navbar.css';

// Import assets.
import logoCompressed from '../assets/logo_compressed.png';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
       <div className='navbar-container'> 
            <div className='navbar-left'>
                <img src={logoCompressed}/>
            </div>  
				
      
            <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
            </div>

            <div className='navbar-right'>

            </div> 
        </div> 
                
    
  );
};

export default NavBar;


