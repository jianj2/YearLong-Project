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
                {renderSideBarResetModal()}
                <div
                    className={`sidebar-instructions ${(pathname === "Instructions") ? "active" : ""}`}
                    // href="/clinician/Instructions"
                    onClick={() => {
                        if (pathname !== "Instructions") {
                            window.location.href = "/clinician/Instructions"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/clinician/Instructions");
                        }
                    }}
                >
                    Instructions for Clinicians
                </div>

                <div
                    className={`sidebar-do-the-test ${(pathname === "DoTheTest") ? "active" : ""}`}
                    // href="/clinician/DoTheTest"
                    onClick={() => {
                        if (pathname !== "DoTheTest") {
                            window.location.href = "/clinician/DoTheTest"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/clinician/DoTheTest");
                        }
                    }}

                >
                    Start a Questionnaire
                </div>
                <div
                    className={`sidebar-share ${(pathname === "Share") ? "active" : ""}`}
                    // href="/clinician/Share"
                    onClick={() => {
                        if (pathname !== "Share") {
                            window.location.href = "/clinician/Share"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/clinician/Share");
                        }
                    }}
                >
                    Share a Questionnaire
                </div>
                <div
                    className={`sidebar-questionnaires
            ${(pathname === "clinician" || pathname === "Questionnaires" || pathname === "edit" || pathname === "view") ? "active" : ""}`}
                    // href="/clinician/Questionnaires"
                    onClick={() => {
                        if (pathname !== "clinician" && pathname !== "Questionnaires" && pathname !== "edit" && pathname !== "view") {
                            window.location.href = "/clinician/Questionnaires"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/clinician/Questionnaires");
                        }
                    }}
                >
                    List of Questionnaires
                </div>
            </div>
        );
    } else if (userType === USER_TYPE_ADMIN) {
        return (

            <div className="sidebar-container">
                {renderSideBarResetModal()}
                <div
                    className={`sidebar-questionnaires
                        ${(pathname === "admin" || pathname === "Questionnaires" || pathname === "edit" || pathname === "view") ? "active" : ""}`}
                    // href="/admin/Questionnaires"
                    onClick={() => {
                        if (pathname !== "admin" && pathname !== "Questionnaires" && pathname !== "edit" && pathname !== "view") {
                            window.location.href = "/admin/Questionnaires"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/admin/Questionnaires");
                        }
                    }}
                >
                    Questionnaires
                </div>
                <div
                    className={`sidebar-ssq-instructions ${(pathname === "SSQ_Instructions") ? "active" : ""}`}
                    // href="/admin/SSQ_Instructions"
                    onClick={() => {
                        if (pathname !== "SSQ_Instructions") {
                            window.location.href = "/admin/SSQ_Instructions"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/admin/SSQ_Instructions");
                        }
                    }}
                >
                    SSQ Instructions
                </div>
                <div
                    className={`sidebar-organisation ${(pathname === "Organisation" || pathname === "Country") ? "active" : ""}`}
                    // href="/admin/Country"
                    onClick={() => {
                        if (pathname !== "Organisation" && pathname !== "Country") {
                            window.location.href = "/admin/Country"
                        } else {
                            setIsSideBarResetModal(true);
                            setRefreshUrl("/admin/Country");
                        }
                    }}
                >
                    Organisation
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default SideBar;
