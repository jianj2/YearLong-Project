/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen, Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React from "react";

// Import styles.
import "../../styles/topcontainer.css";
import "../../styles/main.css";

import * as API from "../../utils/api";

// handles rendering of TopContainer in the Clinician page
const TopContainer = () => {
    var manage_qustionnaire_url = "/clinician"
    return (
        
        <div className="top-container">
            <button style={{width:'12%',marginLeft:'10px', marginRight:'80px'}}
            onClick = {()=> (window.location.href = manage_qustionnaire_url)}>CANCEL</button>
            <button style={{width:'12%',marginRight:'10px'}}
            onClick = {()=> {
                API.editQuestionnaire();

                window.location.href = manage_qustionnaire_url;
            }
            }> SAVE </button>
        </div>
    );
};


export default TopContainer;
