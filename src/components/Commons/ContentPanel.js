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
import {
    ManageQuestionnaires,
    DoTheTestContainer,
    InstructionsContainer,
    QuestionnaireContainer,
    ViewQuestionnaireContainer,
    ShareContainer
} from '../../screens/Clinician'

// Import Styles
import "../../styles/contentpanel.css";
import "../../styles/main.css";

import { USER_TYPE_CLINICIAN, USER_TYPE_ADMIN } from '../../utils/helper'
import SSQInstructionsList from "../../screens/Admin/SSQInstructionsList";
import CountryList from "../../screens/Admin/CountryList";
import AdminViewStandardQuestionnaire
    from "../../screens/Admin/AdminViewStandardQuestionnaire";
import InstructionContainer from "../../screens/Admin/SSQInstructionContainer";
import OrganisationList from "../../screens/Admin/OrganisationList";
import OrganisationContainer from "../../screens/Admin/OrganisationContainer";
import AdminManageQuestionnaires
    from "../../screens/Admin/AdminManageQuestionnaires";


const ContentPanel = (props) => {

    if (props.userType === USER_TYPE_CLINICIAN) {

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
    } else if (props.userType === USER_TYPE_ADMIN) {
        if (props.active === 2) {
            return (
                <div className="content-container">
                    <SSQInstructionsList />
                </div>
            );
        } else if (props.active === 3) {
            return (
                <div className="content-container">
                    <CountryList />
                </div>
            );
        } else if (props.active === 4) {
            return (
                <div className="content-container">
                    <QuestionnaireContainer
                        questionnaireID={props.questionnaireID}
                        redirectURL="/admin/Questionnaires"
                    />
                </div>
            );
        } else if (props.active === 5) {
            return (
                <div className="content-container">
                    <AdminViewStandardQuestionnaire
                        questionnaireID={props.questionnaireID}
                    />
                </div>
            );
        } else if (props.active === 6) {
            return (
                <div className="content-container">
                    <InstructionContainer
                        instructionType={props.instructionType}
                    />
                </div>
            );
        } else if (props.active === 7) {
            return (
                <div className="content-container">
                    <OrganisationList countryName={props.countryName} />
                </div>
            )
        } else if (props.active === 8) {
            return (
                <div className="content-container">
                    <OrganisationContainer organName={props.organName} />
                </div>
            )
        }
        else {
            return (
                <div className="content-container">
                    <AdminManageQuestionnaires />
                </div>
            );
        }
    } else {
        return null;
    }
};

export default ContentPanel;
