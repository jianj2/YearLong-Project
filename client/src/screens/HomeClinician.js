/**
 * ====================================================================
 * REACT SCREEN COMPONENT CLASS
 * ====================================================================
 * @date created: 10th May 2020
 * @authors: Waqas Rehmani, Cary Jin, SaiEr Ding
 *
 * The Home screen component defines our screen for the route
 * '/clinician'. This will be the first screen clinicians will see
 * when they choose the Clinician option.
 *
 * This file is used to display the Clinician Home screen.
 *
 */

import React, { useEffect } from "react";

import { useAuth0 } from "../react-auth0-spa";

import Loading from '../components/Loading';

// Import styles.
import "../styles/clinician.css";
import "../styles/main.css";

// ---------------------------------------------------------------
// This function defines the Clinician Home screen.
// ---------------------------------------------------------------
const HomeClinician = () => {
    const { loading, isAuthenticated, loginWithRedirect, user } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: { targetUrl: window.location.pathname },
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
            <h1>Pediatric SSQ</h1>
            <h3>Welcome Clinician!</h3>
            <h2>{user.name}</h2>
            <h4>H O M E</h4>
        </div>
    );
}

export default HomeClinician;
