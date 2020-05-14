/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The Home screen component defines our screen for the route
 * '/admin'. This will be the first screen the admin will see
 * when they choose the Admin option.
 *
 * This file is used to display the Admin Home screen.
 *
 */

import React, { useEffect } from "react";

import { useAuth0 } from "../react-auth0-spa";

// Import styles.
import "../styles/clinician.css";
import "../styles/main.css";

// ---------------------------------------------------------------
// This function defines the Clinician Home screen.
// ---------------------------------------------------------------
const HomeAdmin = () => {

    return (
        <div className="HomeClinician">
            <h1>Pediatric SSQ</h1>
            <h3>Welcome Admin!</h3> 
            <h4>H O M E</h4>
        </div>
    );
};

export default HomeAdmin;
