/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 16th May 2020
 * @authors: Guang Yang
 *
 * The content panel will display the content when people click the side bar
 *
 * This file is used to display the content panel
 *
 */

import React, {useState} from "react";

// Import styles.
import "../../styles/contentpanel.css";
import ManageQuestionnaires from "../Clinician/ManageQuestionnaires";


const ContentPanel = () => {
    var pathname = window.location.href.split("/").pop()
    if(pathname === "clinician#DoTheTest"){
        return (
            <div className="content-container">
                Do the test
            </div>
            
        );
    }
    
    else if(pathname === "clinician#Instruct"){
        return (
            <div className="content-container">
                Instruct
            </div>
        );
    }

    else{
        return(
            <div className="content-container">
                <ManageQuestionnaires/>
            </div>
        )
    }
   
};


export default ContentPanel;
