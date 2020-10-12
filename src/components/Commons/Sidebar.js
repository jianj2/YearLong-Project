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

// Import Utilities
import { USER_TYPE_ADMIN, USER_TYPE_CLINICIAN } from '../../utils/helper'

// Import Styles
import "../../styles/sidebar.css";

// handles rendering of SideBar with Login
const SideBar = ({ userType }) => {

    const pathname = window.location.href.split("/").pop()
    if (userType === USER_TYPE_CLINICIAN) {
        return (
            <div className="sidebar-container">
                <Link
                    className={`sidebar-questionnaires
            ${(pathname === "clinician" || pathname === "Questionnaires" || pathname === "edit")? "active" : ""}`}
                    to = "/clinician/Questionnaires">Questionnaires</Link>
                <Link
                    className={`sidebar-do-the-test ${(pathname === "DoTheTest")? "active" : ""}`}
                    to = "/clinician/DoTheTest">Start a Questionnaire</Link>
                <Link
                    className={`sidebar-share ${(pathname === "Share")? "active" : ""}`}
                    to = "/clinician/Share">Share a Questionnaire</Link>
                <Link
                    className={`sidebar-instructions ${(pathname === "Instructions")? "active" : ""}`}
                    to = "/clinician/Instructions">Instructions</Link>
            </div>
        );
    } else if (userType === USER_TYPE_ADMIN){
        return (
            <div className="sidebar-container">
                <Link
                    className={`sidebar-questionnaires
                        ${(pathname === "admin" || pathname === "Questionnaires" || pathname === "edit") ? "active" : ""}`}
                      to="/admin/Questionnaires"
                >
                    Questionnaires
                </Link>
                <Link
                    className={`sidebar-ssq-instructions ${(pathname === "SSQ_Instructions") ? "active" : ""}`}
                    to="/admin/SSQ_Instructions"
                >
                    SSQ Instructions
                </Link>
                <Link
                    className={`sidebar-organisation ${(pathname === "Organisation" || pathname === "Country") ? "active" : ""}`}
                    to="/admin/Country"
                >
                    Organisation
                </Link>
            </div>
        )
    } else {
        return null
    }

};


export default SideBar;
