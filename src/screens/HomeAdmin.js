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

import React from "react";

// Import Utilities
import { useAdminAuth } from "../utils/useAdminAuth";
import { USER_TYPE_ADMIN } from "../utils/helper";

// Import components
import { FormLoginAdmin } from "../components/Forms";
import { SideBar } from "../components/Commons";

// Import assets.
import logoComplete from "../assets/logo_complete.png";
import { Loading } from "../components/Commons";
import ContentPanel from "../components/Commons/ContentPanel";

// ---------------------------------------------------------------
// This function defines the Admin's Home screen.
// ---------------------------------------------------------------
const HomeAdmin = (props) => {
    console.log("It exists", process.env.REACT_APP_SERVER);
    const { isAdminAuthenticated, adminLogin, loading } = useAdminAuth();
    if (loading === true) {
        return <Loading/>;
    }

    if (isAdminAuthenticated === true) {
        return (
            <div className="HomeAdmin">
                <SideBar userType={USER_TYPE_ADMIN}/>
                <div className="content-container">
                    <ContentPanel
                        userType={USER_TYPE_ADMIN}
                        active={props.active}
                        questionnaireID={props.questionnaireID}
                        instructionType={props.instructionType}
                        organName={props.organName}
                        countryName={props.countryName}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="landing">
                <div className="landing-logo">
                    <img src={logoComplete}/>
                </div>

                <div className="landing-buttons">
                    <FormLoginAdmin adminLogin={adminLogin}/>
                </div>
            </div>
        );
    }
};

export default HomeAdmin;
