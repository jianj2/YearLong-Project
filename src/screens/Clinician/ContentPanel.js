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

import React from "react";

// Import Screens
import ManageQuestionnaires from "./ManageQuestionnaires";
import DoTheTestContainer from "./DoTheTestContainer";
import InstructionsContainer from "./InstructionsContainer";
import QuestionnaireContainer from "./QuestionnaireContainer";
import ViewQuestionnaireContainer from "./ViewQuestionnaireContainer";
import ShareContainer from "./ShareContainer";

//import Style
import "../../styles/contentpanel.css";
import "../../styles/main.css";

const ContentPanel = (props) => {
    if (props.active === 2) {
        return (
            <DoTheTestContainer/>
        );
    } else if (props.active === 3) {
        return (
            <InstructionsContainer/>
        );
    } else if (props.active === 4) {
        return (
            <QuestionnaireContainer
                questionnaireID={props.questionnaireID}
                redirectURL="/clinician"
            />
        );
    } else if (props.active === 5) {
        return (
            <ViewQuestionnaireContainer
                questionnaireID={props.questionnaireID}
            />
        );
    } else if (props.active === 6) {
        return (
            <ShareContainer/>
        );
    } else {
        return (
            <ManageQuestionnaires/>
        );
    }
};

export default ContentPanel;
