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
    const pathNamesWithWarning = ["DoTheTest", "SSQInstruction", "Questionnaire"];

    const [isSideBarResetModal, setIsSideBarResetModal] = useState(false);
    const [refreshUrl, setRefreshUrl] = useState("");

    const handleSideBarReset = () => {
        window.location.href = refreshUrl;
    };

    // renders a modal when user wants to click the sidebar and reset the page
    const renderSideBarResetModal = () => {
        const message = "Are you sure you want to leave this page?";
        return (
            <CustomModal
                isModalVisible={isSideBarResetModal}
                setIsModalVisible={setIsSideBarResetModal}
                message={message}
                onClickConfirm={handleSideBarReset}
                onClickCancel={() => {}}
            />
        );
    };

    const renderSideBarTab = (
        classSuffix,
        destPathName,
        textLabel
    ) => {
        let currentPathName;
        const currentPathFullName =  window.location.pathname.split("/");
        if ( currentPathFullName.length <= 2){
            currentPathName = currentPathFullName[0];
        }else{
            currentPathName = currentPathFullName[2];
        }
 
    
        return (
            <div
                className={`sidebar-${classSuffix} ${
                    destPathName.split("/")[1] === currentPathName ? "active" : ""
                }`}
                onClick={() => {
                    if (pathNamesWithWarning.includes(currentPathName)) {
                        setIsSideBarResetModal(true);
                        setRefreshUrl(`/${destPathName}`);
                   
                } else {
                    window.location.href = `/${destPathName}`;
                   
            }
                }}
            >
                {textLabel}
            </div>
        );
    };


    if (userType === USER_TYPE_CLINICIAN) {
        return (
            <div className="sidebar-container">
                {renderSideBarResetModal()}

                {renderSideBarTab(
                    "instructions",
                    "clinician/Instructions",
                    "Instructions for Clinicians"
                )}

                {renderSideBarTab(
                    "do-the-test",
                    "clinician/DoTheTest",
                    "Start a Questionnaire"
                )}

                {renderSideBarTab(
                    "share",
                    "clinician/Share",
                    "Share a Questionnaire"
                )}

                {renderSideBarTab(
                    "questionnaires",
                    "clinician/Questionnaires",
                    "List of Questionnaires"
                )}
            </div>
        );
    } else if (userType === USER_TYPE_ADMIN) {
        return (
            <div className="sidebar-container">
                {renderSideBarResetModal()}

                {renderSideBarTab(
                    "questionnaires",
                    "admin/Questionnaires",
                    "Questionnaires"
                )}

                {renderSideBarTab(
                    "ssq-instructions",
                    "admin/SSQ_Instructions",
                    "SSQ Instructions"
                )}

                {renderSideBarTab(
                    "organisation",
                    "admin/Country",
                    "Organisation"
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default SideBar;
