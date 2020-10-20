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
        handleRedirectCallback
    } = useAuth0();

    const domain = process.env.REACT_APP_SERVER || "http://localhost:3001";
    const client = process.env.REACT_APP_CLIENT || "http://localhost:3000";

    // this API must be listed in one of the Auth0 APIs
    const clinicianAuthAPI = `${domain}/clinician`;

    const [popupBlocked, setPopupBlocked] = useState(false);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!loading && isAuthenticated && user != null) {
            let accessToken;

            const showErrorToUnblockPopup = () => {
                console.log("inside showErrorToUnblockPopup ");
                let isPopupBlocked = false;

                let popup_window = window.open("", );

                // isPopupBlocked = false;
                try {
                    console.log("inside try", isPopupBlocked);
                    popup_window.focus();
                    console.log("inside try after focus", isPopupBlocked);
                    setPopupBlocked(false);

                } catch (e) {
                    console.log("inside catch", e);
                    isPopupBlocked = true;
                    window.alert("Pop-up Blocker is enabled on your browser! This website uses popups for background processes. Please enable it to continue.");
                    console.log("inside catch after alert", isPopupBlocked);
                }

                if (popup_window) {
                    popup_window.close();
                }
                console.log("popup_window", popup_window);

                return isPopupBlocked;

            };

            const showErrorPartTwo = () => {

                var newWin = window.open("");

                let isPopupBlocked = false;
                if(!newWin || newWin.closed || typeof newWin.closed=='undefined')
                {
                    //POPUP BLOCKED

                    isPopupBlocked = true;
                }

                return isPopupBlocked;
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


                    let isPopupBlocked = true;

                    // if (popupBlocked){
                    //     isPopupBlocked = showErrorToUnblockPopup();
                    // }


                    isPopupBlocked = showErrorPartTwo();

                    console.log("The sypud isPopupBlocked is blokckkkk LOL", isPopupBlocked);

                    if (isPopupBlocked) {
                        setPopupBlocked(true);
                    } else {

                        console.log("inside code block to get token with popup");
                        accessToken = await getTokenWithPopup({
                            // this is for the first time when some registers on localhost (
                            // localhost is treated differently by Auth0
                            audience: clinicianAuthAPI,
                            scope: "read:current_user"
                        });
                        setToken(accessToken);
                    }

                    //
                    //
                    // console.log("accessToken", accessToken)
                    // setToken(accessToken);
                }
            };

            setAuth0Token();

            // getTokenSilently().then(res => {
            //     console.log("getTokenSilently", res);
            //     // setToken(res);
            // })

            return;
        }

        handleRedirectCallback().then(res => console.log("dada ", res));

        const fn = async () => {
            let temp = await loginWithRedirect({
                // redirect_uri: `${client}/clinician`
                redirect_uri: window.location.href

                //"http://localhost:3000/clinician", //TODO: figure out why window.location.pathname doesn't work
                //redirect_uri: "https://d1hg2pgsuj0kio.cloudfront.net/clinician", //TODO: figure out why window.location.pathname doesn't work
                //appState: { targetUrl: window.location.pathname},
            });
            console.log("temp'", temp);
            return temp;
        };

        fn();

    }, [isAuthenticated, loading, user]);

    if (loading || !user) {
        return <Loading/>;
    }

    if (popupBlocked) {
        return (
            <div >
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
