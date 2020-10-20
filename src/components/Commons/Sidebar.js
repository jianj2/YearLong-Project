// Import Libraries.
import React from "react";
// This Link is replace by a
// import { Link } from "react-router-dom"; 
// Import Utilities
import { USER_TYPE_ADMIN, USER_TYPE_CLINICIAN } from "../../utils/helper";

/**
 * =============================================================================
 * REACT COMPONENT CLASS
 * =============================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang, Waqas Rehmani
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const SideBar = ({ userType }) => {

    const pathname = window.location.href.split("/").pop();
    if (userType === USER_TYPE_CLINICIAN) {
        return (
            <div className="sidebar-container">
                {/* when click the siderbar tab, the page need to refresh(client requirement), Change Link to a */}
                {/* <Link
                    className={`sidebar-instructions ${(pathname === "Instructions") ? "active" : ""}`}
                    to="/clinician/Instructions"
                >
                    Instructions for Clinicians
                </Link> */}
                <a
                    className={`sidebar-instructions ${(pathname === "Instructions") ? "active" : ""}`}
                    href="/clinician/Instructions"
                >
                    Instructions for Clinicians
                </a>

                <a
                    className={`sidebar-do-the-test ${(pathname === "DoTheTest") ? "active" : ""}`}
                    href="/clinician/DoTheTest"
                >
                    Start a Questionnaire
                </a>
                <a
                    className={`sidebar-share ${(pathname === "Share") ? "active" : ""}`}
                    href="/clinician/Share"
                >
                    Share a Questionnaire
                </a>
                <a
                    className={`sidebar-questionnaires
            ${(pathname === "clinician" || pathname === "Questionnaires" || pathname === "edit") ? "active" : ""}`}
                    href="/clinician/Questionnaires"
                >
                    List of Questionnaires
                </a>
            </div>
        );
    } else if (userType === USER_TYPE_ADMIN) {
        return (
            <div className="sidebar-container">
                <a
                    className={`sidebar-questionnaires
                        ${(pathname === "admin" || pathname === "Questionnaires" || pathname === "edit") ? "active" : ""}`}
                    href="/admin/Questionnaires"
                >
                    Questionnaires
                </a>
                <a
                    className={`sidebar-ssq-instructions ${(pathname === "SSQ_Instructions") ? "active" : ""}`}
                    href="/admin/SSQ_Instructions"
                >
                    SSQ Instructions
                </a>
                <a
                    className={`sidebar-organisation ${(pathname === "Organisation" || pathname === "Country") ? "active" : ""}`}
                    href="/admin/Country"
                >
                    Organisation
                </a>
            </div>
        );
    } else {
        return null;
    }
};

export default SideBar;
