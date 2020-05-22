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
import ManageQuestionnaires from "./ManageQuestionnaires";
import {BrowserRouter as Router, Route} from "react-router-dom";
import DoTheTestContainer from "./DoTheTestContainer";
import InstructionsContainer from "./InstructionsContainer";
import QuestionnaireContainer from "./QuestionnaireContainer"

const ContentPanel = (props) => {
    
    if(props.active === 2){
        return (
            <div className="content-container">
                <DoTheTestContainer />
            </div>
        );
    }
    
    else if(props.active === 3){
        return (
            <div className="content-container">
                <InstructionsContainer />
            </div>
        );
    }

    else if(props.active === 4){
        return (
                <QuestionnaireContainer />
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
