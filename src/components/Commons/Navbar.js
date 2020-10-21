// Import Libraries.
import React from "react";
import { Link } from 'react-router-dom'
import { IoMdLogOut } from "react-icons/io";
// Import Utilities.
import { useAuth0 } from "../../utils/react-auth0-spa";
import { useAdminAuth } from "../../utils/useAdminAuth";
// Import Assets.
import logoCompressed from "../../assets/logo_compressed.png";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The Navbar component defines our Navbar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Navbar component
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const NavBar = () => {
    const { isAuthenticated, logout } = useAuth0();
    const { isAdminAuthenticated, adminLogout } = useAdminAuth();

    return (
        <div className="navbar-container">
            <div className="navbar-left">
                {
                    isAuthenticated ?
                        <Link to="/clinician">
                            <img src={logoCompressed} alt="logo" />
                        </Link>
                        : null
                }
                {
                    isAdminAuthenticated ?
                        <Link to="/admin">
                            <img src={logoCompressed} alt="logo" />
                        </Link>
                        : null
                }
                {
                    (!isAdminAuthenticated && !isAuthenticated) ?
                            <img src={logoCompressed} alt="logo" />
                        : null
                }
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
