// Import Libraries.
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// Import Assets.
import logoComplete from "../assets/logo_complete.png";

/**
 * =============================================================================
 * REACT SCREEN COMPONENT CLASS
 * =============================================================================
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
////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const Landing = () => {

    return (
        <div className="landing">
            <Helmet>
                <meta charSet="utf-8" />
                <title>SSQ: Digital Scale</title>
            </Helmet>
            <div className="landing-logo">
                <img src={logoComplete} alt="SSQ Logo"/>
            </div>

            <div className="landing-buttons">
                <Link
                    className="landing-button"
                    to="/clinician"
                >
                    Clinician
                </Link>

                <Link
                    className="landing-button"
                    to="/admin"
                >
                    Admin
                </Link>
            </div>
        </div>
    );
};

export default Landing;
