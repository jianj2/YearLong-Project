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
import {getSecret} from "../utils/api";

// Import styles.
import "../styles/clinician.css";
import "../styles/main.css";
import SideBar from "../components/Clinician/Sidebar";

import ContentPanel from "../components/Clinician/ContentPanel";
import { Cookies } from 'react-cookie';

// ---------------------------------------------------------------
// This function defines the Clinician Home screen.
// ---------------------------------------------------------------
const HomeClinician = (props) => {
    const { loading, isAuthenticated, loginWithRedirect, user, getTokenSilently, setHasToken} = useAuth0();
    
    const domain = "http://localhost:3001";
    
     
    
       
    
    useEffect(() => {
        if (loading ) {
            return;
        }
        if (!loading && isAuthenticated){
            console.log("setting cookie");
            const setCookie = async ()=>{
                console.log("getting token");
                try {
                const accessToken = await getTokenSilently({
                    audience: `${domain}/clinician`,
                    scope: "read:current_user",
                  });
                  
                const cookies = new Cookies();
                cookies.set("accessToken", accessToken, {
                    maxAge: 3600 // Will expire after 1hr (value is in number of sec.)
                 });
                setHasToken(true);
                 
                
                }catch(e){
                    console.log("error:", e);
                }
            }
            setCookie();
            return;
        }


        const fn = async () => {
            await loginWithRedirect({
                redirect_uri: "http://localhost:3000/clinician", //TODO: figure out why window.location.pathname doesn't work

                //redirect_uri: "https://d1hg2pgsuj0kio.cloudfront.net/clinician", //TODO: figure out why window.location.pathname doesn't work

                //appState: { targetUrl: window.location.pathname},
            });
            
  
        };

        fn();
    }, [isAuthenticated, loading, user, loginWithRedirect]);

    // const { loading, user } = useAuth0();

    if (loading || !user) {
        return <Loading />;
    }else{
        
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
