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

// Import Libraries
import React, { useEffect } from "react";

// Import Utilities
import { useAuth0 } from "../utils/react-auth0-spa";
import { USER_TYPE_CLINICIAN } from "../utils/helper";

// Import styles.
import "../styles/clinician.css";
import "../styles/main.css";

// Import Components
import { SideBar } from "../components/Commons";
import ContentPanel from "../components/Clinician/ContentPanel";
import { Loading } from "../components/Commons";

// ---------------------------------------------------------------
// This function defines the Clinician Home screen.
// ---------------------------------------------------------------
const HomeClinician = (props) => {
    const {
        loading,
        isAuthenticated,
        loginWithRedirect,
        user,
        getTokenSilently,
        getTokenWithPopup,
        setToken,
    } = useAuth0();

    const domain = process.env.REACT_APP_SERVER || "http://localhost:3001";
    const client = process.env.REACT_APP_CLIENT || "http://localhost:3000";

    // this API must be listed in one of the Auth0 APIs
    const clinicianAuthAPI = `${domain}/clinician`;

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!loading && isAuthenticated && user != null) {
            let accessToken;
            const setAuth0Token = async () => {
                try {
                    accessToken = await getTokenSilently({
                        audience: clinicianAuthAPI,
                        scope: "read:current_user",
                    });
                    setToken(accessToken);
                } catch (e) {
                    accessToken = await getTokenWithPopup({
                        // this is for the first time when some registers on localhost (
                        // localhost is treated differently by Auth0
                        audience: clinicianAuthAPI,
                        scope: "read:current_user",
                    });
                    setToken(accessToken);
                    // console.log("error:", e);
                }
            };
            setAuth0Token();
            return;
        }

        const fn = async () => {
            await loginWithRedirect({
                redirect_uri: `${client}/clinician`,

                //"http://localhost:3000/clinician", //TODO: figure out why window.location.pathname doesn't work

                //redirect_uri: "https://d1hg2pgsuj0kio.cloudfront.net/clinician", //TODO: figure out why window.location.pathname doesn't work

                //appState: { targetUrl: window.location.pathname},
            });
        };

        fn();
    }, [isAuthenticated, loading, user]);
    if (loading || !user) {
        return <Loading />;
    } else {
    }

    return (
        <div className="HomeClinician">
            <SideBar userType={USER_TYPE_CLINICIAN} />

            <ContentPanel
                active={props.active}
                questionnaireID={props.questionnaireID}
            />
        </div>
    );
};

export default HomeClinician;
