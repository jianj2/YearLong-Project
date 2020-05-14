/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The Home screen component defines our screen for the route
 * '/parents'. This will be the first screen parents will see
 * when they choose the Parents option.
 *
 * This file is used to display the Parents Home screen.
 *
 */


import React from 'react';

import { useAuth0 } from "../react-auth0-spa";


// Import styles.
import '../styles/parents.css';
import "../styles/main.css";

const HomeParents = () => {
    // ---------------------------------------------------------------
    // This method defines the elements for this component.
    // ---------------------------------------------------------------

    return (
        <div className="home">
            <h1>Pediatric SSQ</h1>
            <h3>Welcome</h3> 
            <h4>H O M E</h4>
        </div>
    );
};

export default HomeParents