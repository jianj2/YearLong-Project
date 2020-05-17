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

import React, {useState} from "react";
import { Link } from 'react-router-dom'

// Import styles.
import "../../styles/sidebar.css";


// handles rendering of SideBar with Login
const SideBar = () => {

    //0 is the first tab - Questionnaire,
    //1 is the second tab - Do the test
    //2 is the third tab - Instructions
    const [clickedElement, setClickedElement] = useState(0);
    
    function handleClickQuestionnaires() {
        setClickedElement(0)
    }

    function handleClickDoTheTest() {
        setClickedElement(1)
    }

    function handleInstruction() {
        setClickedElement(2)
    }

    return (
        <div className="sidebar-container">
            <Link className={`sidebar-questionnaires ${(clickedElement === 0)? "active" : ""}`}
                 onClick={handleClickQuestionnaires} to = "#Questionnaires">Questionnaires</Link>
            <Link className={`sidebar-do-the-test ${(clickedElement === 1)? "active" : ""}`}
                 onClick={handleClickDoTheTest} to = "#DoTheTest">Do The Test</Link>
            <Link className={`sidebar-instructions ${(clickedElement === 2)? "active" : ""}`}
                 onClick={handleInstruction} to = "#Instruct">Instructions</Link>
        </div>
    );
};


export default SideBar;
