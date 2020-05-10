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

import React, { Component } from 'react';

// Import styles.
import '../styles/navbar.css';

// Import assets.
import logoCompressed from '../assets/logo_compressed.png';

class Navbar extends Component {

    // ---------------------------------------------------------------
    // This method defines the elements for this component.
    // ---------------------------------------------------------------
    render(){
        return(
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <img src={logoCompressed}/>
                </div>

                <div className='navbar-right'>

                </div>
            </div>
        )
    }
}

export default Navbar;