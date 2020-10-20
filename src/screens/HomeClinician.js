// Import Libraries.
import React, { useEffect, useState } from "react";
// Import Utilities.
import { useAuth0 } from "../utils/react-auth0-spa";
import { USER_TYPE_CLINICIAN } from "../utils/helper";
// Import Components.
import { SideBar, Loading, ContentPanel } from "../components/Commons";

/**
 * =============================================================================
 * REACT SCREEN COMPONENT CLASS
 * =============================================================================
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

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
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
    // const client = process.env.REACT_APP_CLIENT || "http://localhost:3000";

    // this API must be listed in one of the Auth0 APIs
    const clinicianAuthAPI = `${domain}/clinician`;

    const [popupBlocked, setPopupBlocked] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!loading && isAuthenticated && user != null) {
            let accessToken;

            // =================================================================
            // This code is mainly used for Safari. Safari has extra security
            // protocols that disallows the getTokenSilently method so it always
            // has to get the token through the popup, but safari also blocks
            // popups by default. Therefore, this check was made to ask the user
            // to unblock popups on the domain.
            // =================================================================
            const checkPopupBlocked = () => {

                var newWin = window.open("");
                let isPopupBlocked = false;
                if(!newWin || newWin.closed || typeof newWin.closed=='undefined') {
                    //POPUP BLOCKED
                    isPopupBlocked = true;
                }
                // Return the status and the window object so that it can be
                // closed.
                return {
                    isPopupBlocked,
                    popupWindow: newWin
                };
            }

            const setAuth0Token = async () => {
                try {
                    accessToken = await getTokenSilently({
                        audience: clinicianAuthAPI,
                        scope: "read:current_user"
                    });

                    console.log("Main yahan hoon yahan hoon'");
                    console.log("accessToken", accessToken);

                    setToken(accessToken);
                } catch (e) {
                    const { isPopupBlocked, popupWindow } = checkPopupBlocked();

                    // If popup is blocked, we set the setPopupBlocked state to
                    // true to show the page to ask user to unblock popup.
                    if (isPopupBlocked) {
                        setPopupBlocked(true);
                    } else {
                        // Close the extra window opened to check whether popups
                        // are blocked.
                        popupWindow.close();

                        accessToken = await getTokenWithPopup({
                            // this is for the first time when some registers on localhost (
                            // localhost is treated differently by Auth0
                            audience: clinicianAuthAPI,
                            scope: "read:current_user"
                        });
                        setToken(accessToken);
                    }
                }
            };
            setAuth0Token();

            return;
        }

        const fn = async () => {
            await loginWithRedirect({
                // redirect_uri: `${client}/clinician`
                redirect_uri: window.location.href

                //"http://localhost:3000/clinician", //TODO: figure out why window.location.pathname doesn't work
                //redirect_uri: "https://d1hg2pgsuj0kio.cloudfront.net/clinician", //TODO: figure out why window.location.pathname doesn't work
                //appState: { targetUrl: window.location.pathname},
            });
        };

        fn();

    }, [isAuthenticated, loading, user]);

    if (loading || !user) {
        return <Loading/>;
    }

    if (popupBlocked) {
        return (
            <div className='popup-blocked'>
                <h1>Please enable popups!</h1>
                <p>
                    This website uses popups for background processes. Please
                    enable them to continue.
                </p>
                <p>
                    Please refresh the page after enabling.
                </p>
            </div>
        );
    }

    return (
        <div className="HomeClinician">
            <SideBar userType={USER_TYPE_CLINICIAN}/>

            <div className="content-container">
                <ContentPanel
                    userType={USER_TYPE_CLINICIAN}
                    active={props.active}
                    questionnaireID={props.questionnaireID}
                />
            </div>

        </div>
    );
};

export default HomeClinician;
