/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 * AdminSideBar
 * This file is used to display the Sidebar component
 *
 */
import React from "react";
import {Link} from "react-router-dom";

import "../../styles/sidebar.css";

const AdminSideBar = (props) =>{

    const pathname = window.location.href.split("/").pop();

    return (
        <div className="sidebar-container">
            <Link className={`sidebar-questionnaires
            ${(pathname === "admin" || pathname === "Questionnaires" || pathname === "edit")? "active" : ""}`}
                  to = "/admin/Questionnaires">Questionnaires</Link>
            <Link className={`sidebar-ssq-instructions ${(pathname === "SSQ_Instructions")? "active" : ""}`}
                  to = "/admin/SSQ_Instructions">SSQ Instructions</Link>
            <Link className={`sidebar-organisation ${(pathname === "Organisation")? "active" : ""}`}
                  to = "/admin/Organisation">Organisation</Link>
        </div>
    )
}

export default AdminSideBar;