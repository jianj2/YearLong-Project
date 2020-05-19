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

import React, { useEffect, useState } from "react";

// Import Utilities
import * as API from '../utils/api'
import { useAdminAuth } from "../utils/useAdminAuth";
import { useAuth0 } from "../utils/react-auth0-spa";


// Import components
import LoginAdmin from "../components/LoginAdmin";

// Import styles.
import "../styles/admin.css";
import "../styles/main.css";

// Import assets.
import logoComplete from "../assets/logo_complete.png";

// ---------------------------------------------------------------
// This function defines the Admin's Home screen.
// ---------------------------------------------------------------
const HomeAdmin = () => {
    const { isAdminAuthenticated, adminLogin } = useAdminAuth();

    if (isAdminAuthenticated) {
        return (
            <div className="HomeClinician">
                <h1>Pediatric SSQ</h1>
                <h3>Welcome Admin!</h3>
                <h4>H O M E</h4>
            </div>
        );
    } else {
        return (
            <div className="landing">
                <div className="landing-logo">
                    <img src={logoComplete} />
                </div>

                <div className="landing-buttons">
                    <LoginAdmin adminLogin={adminLogin} />
                </div>
            </div>
        );
    }
};

export default HomeAdmin;
