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

import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import components.
import ManageQuestionnaires from "./ManageQuestionnaires";
import DoTheTestContainer from "./DoTheTestContainer";
import InstructionsContainer from "./InstructionsContainer";
import QuestionnaireContainer from "./QuestionnaireContainer";
import ViewQuestionnaireContainer from "./ViewQuestionnaireContainer";
import ShareContainer from "./ShareContainer";

//import style
import "../../styles/contentpanel.css";
import "../../styles/main.css";

const ContentPanel = (props) => {
    if (props.active === 2) {
        return (
            <div className="content-container">
                <DoTheTestContainer />
            </div>
        );
    } else if (props.active === 3) {
        return (
            <div className="content-container">
                <InstructionsContainer />
            </div>
        );
    } else if (props.active === 4) {
        return (
            <div className="content-container">
                <QuestionnaireContainer
                    questionnaireID={props.questionnaireID}
                    redirectURL = "/clinician"
                />
            </div>
        );
    } else if (props.active === 5){
        return (
          <div className="content-container">
                <ViewQuestionnaireContainer
                    questionnaireID={props.questionnaireID}
                />
            </div>
        );
    }else if(props.active === 6){
        return (
            <div className="content-container">
                <ShareContainer />
            </div>
        );
    }else {
        return (
            <div className="content-container">
                <ManageQuestionnaires />
            </div>
        );
    }
};

export default ContentPanel;
