/**
 * ====================================================================
 * REACT COMPONENT CLASS
 * ====================================================================
 * @date created: 14th May 2020
 * @authors: Jin Chen Guang Yang
 *
 * The Sidebar component defines our SideBar for the application. This
 * will visible at the top of our application.
 *
 * This file is used to display the Sidebar component
 *
 */

import React from "react";
import { Link } from 'react-router-dom'

// Import styles.
import "../../styles/navbar.css";


// handles rendering of SideBar with Login
const SideBar = () => {
    function handleClickQuestionnaires() {

    }

    function handleClickDoTheTest() {

    }

    function handleInstruction() {

    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-questionnaires"
                 onClick={handleClickQuestionnaires}>Questionnaires</div>
            <div className="sidebar-do-the-test"
                 onClick={handleClickDoTheTest}>Do The Test</div>
            <div className="sidebar-instructions"
                 onClick={handleInstruction}>Instructions</div>
        </div>
    );
};


export default SideBar;
