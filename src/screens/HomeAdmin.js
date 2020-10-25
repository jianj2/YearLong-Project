// Import Libraries.
import React from "react";
import { Helmet } from "react-helmet";
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
const HomeAdmin = ({
    active,
    questionnaireID,
    instructionType,
    organName,
    countryName
}) => {
    const { isAdminAuthenticated, adminLogin, loading } = useAdminAuth();
    if (loading === true) {
        return <Loading/>;
    }

    if (isAdminAuthenticated === true) {
        return (
            <div className="HomeAdmin">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>SSQ: Administrator</title>
                </Helmet>

                <SideBar userType={USER_TYPE_ADMIN}/>
                
                <div className="content-container">
                    <ContentPanel
                        userType={USER_TYPE_ADMIN}
                        active={active}
                        questionnaireID={questionnaireID}
                        instructionType={instructionType}
                        organName={organName}
                        countryName={countryName}
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
