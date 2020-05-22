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
import "../../styles/main.css";
import "../../styles/clinician.css"

// handles rendering of TopContainer in the Clinician page
const EditDescription = () => {

    return (
            <div className="edit-description">
                
                    <h2>Edit Questionnaire</h2>
                
                
                <p>
                
                    <label>Title:</label>
                    <input type="text"/>
                </p>

                <p>
                    <label>Description:</label>
                    <input type="text"/>
                </p>
                <hr/>
            </div>
    );
};

export default EditDescription;
