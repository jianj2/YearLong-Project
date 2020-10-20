// Import Libraries.
import React, { useState } from "react";
import { CustomModal } from "./index";
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
    const [isSideBarResetModal, setIsSideBarResetModal] = useState(false);
    const [refreshUrl, setRefreshUrl] = useState('');

    const handleSideBarReset = () => {
        window.location.href = refreshUrl;
    }

    // renders a modal when user wants to click the sidebar and reset the page
    const renderSideBarResetModal = () => {
        const message =
            "Are you sure you want to refresh this page?";
        return (
            <CustomModal
                isModalVisible={isSideBarResetModal}
                setIsModalVisible={setIsSideBarResetModal}
                message={message}
                onClickConfirm={handleSideBarReset}
                onClickCancel={() => { }}
            />
        );
    };

    const renderSideBarTab = (classSuffix, srcPathNames, destPathName, textLabel) => {
        const currentPathName = window.location.href.split("/").pop();
        return  <div
        className={`sidebar-${classSuffix} ${(srcPathNames.includes(currentPathName)) ? "active" : ""}`}

        onClick={() => {
            if (! srcPathNames.includes(currentPathName)) {
                window.location.href = `/${destPathName}`;
            } else {
                setIsSideBarResetModal(true);
                setRefreshUrl( `/${destPathName}`);
            }
        }}
    >
        {textLabel}
    </div>
    }

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
                {renderSideBarResetModal()}

                {renderSideBarTab("instructions", ["Instructions"], "clinician/Instructions", "Instructions for Clinicians")}

                {renderSideBarTab("do-the-test", ["DoTheTest"], "clinician/DoTheTest", "Start a Questionnaire")}

                {renderSideBarTab("share", ["Share"], "clinician/Share", "Share a Questionnaire")}

                {renderSideBarTab("questionnaires", ["clinician", "Questionnaires", "edit", "view"], 
                    "clinician/Questionnaires", "List of Questionnaires")}

            </div>
        );
    } else if (userType === USER_TYPE_ADMIN) {
        return (

            <div className="sidebar-container">
                {renderSideBarResetModal()}

                {renderSideBarTab("questionnaires", ["admin", "Questionnaires", "edit", "view"], "admin/Questionnaires", "Questionnaires")}
               
                {renderSideBarTab("ssq-instructions", ["SSQ_Instructions"], "admin/SSQ_Instructions", "SSQ Instructions")}

                {renderSideBarTab("organisation", ["Organisation", "Country"], "admin/Country", "Organisation")}
                
            </div>
        );
    } else {
        return null;
    }
};

export default SideBar;
