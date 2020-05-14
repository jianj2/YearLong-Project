/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin
 *
 * The Home screen component defines our screen for the route
 * '/clinician'. This will be the first screen clinicians will see
 * when they choose the Clinician option.
 *
 * This file is used to display the Clinician Home screen.
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
