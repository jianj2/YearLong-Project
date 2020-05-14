/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani
 *
 * The Home screen component defines our screen for the route '/'. This
 * will be the first screen users will see when they visit our
 * application.
 *
 * This file is used to display the Home screen.
 *
 */

import React from "react"; 
import { Link } from 'react-router-dom';

// Import assets.
import logoComplete from '../assets/logo_complete.png';


// Import styles.
import "../styles/landing.css";

// ---------------------------------------------------------------
// This method defines the elements for this component.
// ---------------------------------------------------------------
const Landing = () => {

    return (
        <div className="landing">
            <div className="landing-logo">
                <img src={logoComplete} />
            </div>

            <Link className="landing-button-parent landing-button" to="/parent">
                Parent
            </Link>

            <Link
                className="landing-button-clinician landing-button"
                to="/clinician"
            >
                Clinician
            </Link>

            <Link
                className="landing-button-admin landing-button"
                to="/admin"
            >
                Admin
            </Link>
        </div>
    );
};

export default Landing;
