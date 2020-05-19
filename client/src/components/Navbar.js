/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The Navbar component defines our Navbar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Navbar component
 *
 */

import React from "react";
import { useAuth0 } from "../utils/react-auth0-spa";
import { useAdminAuth } from "../utils/useAdminAuth";
import { Link } from 'react-router-dom'
import { IoMdLogOut } from "react-icons/io";

// Import styles.
import "../styles/navbar.css";

// Import assets.
import logoCompressed from "../assets/logo_compressed.png";

// handles rendering of Navigation Bar with Login
const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const { isAdminAuthenticated, adminLogout } = useAdminAuth();

    console.log("isAdminAuthenticated from navbar", isAdminAuthenticated);
    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <Link to="/">
                    <img src={logoCompressed} alt="logo" />
                </Link>
            </div>

            <div className="navbar-right">
                {isAuthenticated && (
                    <button
                        onClick={() => logout()}
                        className="button"
                        title="Log Out"
                    >
                        <label>Clinician Log Out</label>
                        <IoMdLogOut />
                    </button>
                )}
                {isAdminAuthenticated && (
                    <button
                        onClick={() => adminLogout()}
                        className="button"
                        title="Log Out"
                    >
                        <label>Admin Log Out</label>
                        <IoMdLogOut />
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
