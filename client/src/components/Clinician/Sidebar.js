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

import React, {useState} from "react";
import { Link } from 'react-router-dom'

// Import styles.
import "../../styles/sidebar.css";


// handles rendering of SideBar with Login
const SideBar = () => {

    var pathname = window.location.href.split("/").pop()
    return (
        <div className="sidebar-container">
            <Link className={`sidebar-questionnaires
            ${(pathname === "clinician" || pathname === "clinician#Questionnaires")? "active" : ""}`}
                  to = "#Questionnaires">Questionnaires</Link>
            <Link className={`sidebar-do-the-test ${(pathname === "clinician#DoTheTest")? "active" : ""}`}
                  to = "#DoTheTest">Do The Test</Link>
            <Link className={`sidebar-instructions ${(pathname === "clinician#Instruct")? "active" : ""}`}
                  to = "#Instruct">Instructions</Link>
        </div>
    );
};


export default SideBar;
