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

import { useAdminAuth } from "../utils/useAdminAuth";



// Import components
import FormLoginAdmin from "../components/FormLoginAdmin";
import AdminSideBar from "../components/Admin/AdminSideBar";
import AdminContentPanel from "../components/Admin/AdminContentPanel";

// Import styles.
import "../styles/admin.css";
import "../styles/main.css";

// Import assets.
import logoComplete from "../assets/logo_complete.png";
import ContentPanel from "../components/Clinician/ContentPanel";

// ---------------------------------------------------------------
// This function defines the Admin's Home screen.
// ---------------------------------------------------------------
const HomeAdmin = (props) => {
    const { isAdminAuthenticated, adminLogin } = useAdminAuth();

    if (isAdminAuthenticated) {
        return (
            <div className="HomeAdmin">


                <AdminSideBar />

                <AdminContentPanel
                    active={props.active}
                    questionnaireID={props.questionnaireID}
                />
            </div>
        );
    } else {
        return (
            <div className="landing">
                <div className="landing-logo">
                    <img src={logoComplete} />
                </div>

                <div className="landing-buttons">
                    <FormLoginAdmin adminLogin={adminLogin} />
                </div>
            </div>
        );
    }
};

export default HomeAdmin;
