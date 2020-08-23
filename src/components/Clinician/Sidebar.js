/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React from "react";
import { Link } from 'react-router-dom'

// Import styles.
import "../../styles/sidebar.css";


// handles rendering of SideBar with Login
const SideBar = (props) => {

    const pathname = window.location.href.split("/").pop()

    return (
        <div className="sidebar-container">
            {console.log(pathname)}
            <Link className={`sidebar-questionnaires
            ${(pathname === "clinician" || pathname === "Questionnaires" || pathname === "edit")? "active" : ""}`}
                  to = "/clinician/Questionnaires">Questionnaires</Link>
            <Link className={`sidebar-do-the-test ${(pathname === "DoTheTest")? "active" : ""}`}
                  to = "/clinician/DoTheTest">Do The Test</Link>
            <Link className={`sidebar-share ${(pathname === "Share")? "active" : ""}`}
                  to = "/clinician/Share">Share</Link>
            <Link className={`sidebar-instructions ${(pathname === "Instructions")? "active" : ""}`}
                  to = "/clinician/Instructions">Instructions</Link>
        </div>
    );
};


export default SideBar;
