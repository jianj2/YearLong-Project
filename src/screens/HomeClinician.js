/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding, Guang Yang
 *
 * The Home screen component defines our screen for the route
 * '/clinician'. This will be the first screen clinicians will see
 * when they choose the Clinician option.
 *
 * This file is used to display the Clinician Home screen.
 *
 */

import React, { useEffect, useState } from "react";

import { useAuth0 } from "../utils/react-auth0-spa";

import Loading from "../components/Loading";

// Import styles.
import "../styles/clinician.css";
import "../styles/main.css";
import SideBar from "../components/Clinician/Sidebar";

import ContentPanel from "../components/Clinician/ContentPanel";


// ---------------------------------------------------------------
// This function defines the Clinician Home screen.
// ---------------------------------------------------------------
const HomeClinician = (props) => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                redirect_uri: "http://localhost:3000/clinician", //TODO: figure out why window.location.pathname doesn't work
                //appState: { targetUrl: window.location.pathname},
            });
        };

        fn();
    }, [loading, isAuthenticated, loginWithRedirect]);

    // const { loading, user } = useAuth0();

    if (loading || !user) {
        return <Loading />;
    }

    return (
        <div className="HomeClinician">
            <SideBar />

            <ContentPanel
                active={props.active}
                questionnaireID={props.questionnaireID} 
            />
        </div>
    );
};

export default HomeClinician;
