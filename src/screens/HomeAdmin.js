// Import Libraries.
import React from "react";
// Import Utilities.
import { useAdminAuth } from "../utils/useAdminAuth";
import { USER_TYPE_ADMIN } from "../utils/helper";
// Import Components.
import { FormLoginAdmin } from "../components/Forms";
import { SideBar, ContentPanel } from "../components/Commons";
// Import Assets.
import logoComplete from "../assets/logo_complete.png";
import { Loading } from "../components/Commons";

/**
 * =============================================================================
 * REACT SCREEN COMPONENT CLASS
 * =============================================================================
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

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const HomeAdmin = (props) => {
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
                    <img src={logoComplete} alt="SSQ Logo"/>
                </div>

                <div className="landing-buttons">
                    <FormLoginAdmin adminLogin={adminLogin}/>
                </div>
            </div>
        );
    }
};

export default HomeAdmin;
