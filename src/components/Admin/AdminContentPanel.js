/**
 * ====================================================================
 * REACT COMPONENT
 * ====================================================================
 * @date created: 15th August 2020
 * @authors: Jin Chen
 *
 * The content panel will display the content when people click the side bar
 *
 * This file is used to display the content panel
 *
 */

import React from "react";

// Import components.
import AdminManageQuestionnaires from "./AdminManageQuestionnaires";
import SSQInstructionsList from "./SSQInstructionsList";
import SSQIntroductionContainer from "./SSQIntroductionContainer";

//import style
import "../../styles/contentpanel.css";
import "../../styles/main.css";
import ViewQuestionnaireContainer from "../Clinician/ViewQuestionnaireContainer";
import QuestionnaireContainer from "../Clinician/QuestionnaireContainer";
import AdminViewStandardQuestionnaire from "./AdminViewStandardQuestionnaire";
import InstructionContainer from "./SSQInstructionContainer";

const AdminContentPanel = (props) => {
    if (props.active === 2) {
        return (
            <div className="content-container">
                <SSQInstructionsList />
            </div>
        );
    } else if (props.active === 3) {
        return (
            <div className="content-container">
                <SSQIntroductionContainer />
            </div>
        );
    } else if (props.active === 4) {
        return (
            <div className="content-container">
                <QuestionnaireContainer
                    questionnaireID={props.questionnaireID}
                    redirectURL = "/admin/Questionnaires"
                />
            </div>
        );
    } else if (props.active === 5){
        return (
            <div className="content-container">
                <AdminViewStandardQuestionnaire
                     questionnaireID={props.questionnaireID}
                />
            </div>
        );
    } else if (props.active === 6){
        return (
            <div className="content-container">
                <InstructionContainer
                     instructionType={props.instructionType}
                />
            </div>
        );
    }
    
    else {
        return (
            <div className="content-container">
                <AdminManageQuestionnaires />
            </div>
        );
    }
};

export default AdminContentPanel;
